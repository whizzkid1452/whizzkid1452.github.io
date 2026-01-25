import { supabase } from './supabase'

export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Priority = 'high' | 'medium' | 'low'

export interface KanbanCardDB {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  priority: Priority
  category: string
  order_index: number
  created_at: string
  updated_at: string
  start_date: string | null
  end_date: string | null
}

export interface KanbanCardInput {
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  category: string
  order_index?: number
  start_date?: string
  end_date?: string
}

const TABLE = 'kanban_cards'

/**
 * 모든 칸반 카드 조회
 */
export async function fetchKanbanCards(): Promise<KanbanCardDB[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('칸반 카드 조회 실패:', error)
    throw error
  }

  return data || []
}

/**
 * 칸반 카드 생성
 */
export async function createKanbanCard(card: KanbanCardInput): Promise<KanbanCardDB> {
  // 같은 status 컬럼의 최대 order_index 조회
  const { data: maxOrderData } = await supabase
    .from(TABLE)
    .select('order_index')
    .eq('status', card.status)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle()

  const newOrderIndex = (maxOrderData?.order_index ?? -1) + 1

  const { data, error } = await supabase
    .from(TABLE)
    .insert([{
      title: card.title,
      description: card.description || null,
      status: card.status,
      priority: card.priority,
      category: card.category,
      order_index: card.order_index ?? newOrderIndex,
      start_date: card.start_date || null,
      end_date: card.end_date || null,
    }])
    .select()
    .single()

  if (error) {
    console.error('칸반 카드 생성 실패:', error)
    throw error
  }

  return data
}

/**
 * 칸반 카드 수정
 */
export async function updateKanbanCard(
  id: number,
  updates: Partial<KanbanCardInput>
): Promise<KanbanCardDB> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('칸반 카드 수정 실패:', error)
    throw error
  }

  return data
}

/**
 * 칸반 카드 삭제
 */
export async function deleteKanbanCard(id: number): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) {
    console.error('칸반 카드 삭제 실패:', error)
    throw error
  }
}

/**
 * 칸반 카드 상태 및 순서 변경
 */
export async function reorderKanbanCard(
  id: number,
  newStatus: TaskStatus,
  newOrderIndex: number
): Promise<void> {
  // 대상 컬럼의 카드들 순서 업데이트
  const { data: cardsInColumn } = await supabase
    .from(TABLE)
    .select('id, order_index')
    .eq('status', newStatus)
    .neq('id', id)
    .order('order_index', { ascending: true })

  if (cardsInColumn) {
    // 새 위치 이후의 카드들 order_index 증가
    const updatedCards = cardsInColumn.map((card, index) => {
      const adjustedIndex = index >= newOrderIndex ? index + 1 : index
      return { id: card.id, order_index: adjustedIndex }
    })

    // 배치 업데이트
    for (const card of updatedCards) {
      await supabase
        .from(TABLE)
        .update({ order_index: card.order_index })
        .eq('id', card.id)
    }
  }

  // 드래그한 카드 업데이트
  const { error } = await supabase
    .from(TABLE)
    .update({
      status: newStatus,
      order_index: newOrderIndex,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('칸반 카드 순서 변경 실패:', error)
    throw error
  }
}

/**
 * 특정 상태의 카드들 순서 재정렬
 */
export async function reorderCardsInColumn(
  status: TaskStatus,
  cardIds: number[]
): Promise<void> {
  const updates = cardIds.map((id, index) => ({
    id,
    order_index: index,
    updated_at: new Date().toISOString(),
  }))

  for (const update of updates) {
    const { error } = await supabase
      .from(TABLE)
      .update({ order_index: update.order_index, updated_at: update.updated_at })
      .eq('id', update.id)

    if (error) {
      console.error('카드 순서 업데이트 실패:', error)
      throw error
    }
  }
}
