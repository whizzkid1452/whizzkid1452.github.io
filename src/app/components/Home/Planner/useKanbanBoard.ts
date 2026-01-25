import { useState, useCallback, useEffect } from "react";
import type { KanbanCard, TaskStatus } from "./RetroPlanner.types";
import {
  fetchKanbanCards,
  createKanbanCard,
  updateKanbanCard,
  deleteKanbanCard,
  reorderKanbanCard,
  type KanbanCardDB,
} from "../../../../lib/kanbanCards";

// DB 모델을 프론트엔드 모델로 변환
function dbToKanbanCard(dbCard: KanbanCardDB): KanbanCard {
  return {
    id: dbCard.id,
    title: dbCard.title,
    description: dbCard.description || undefined,
    status: dbCard.status as TaskStatus,
    priority: dbCard.priority,
    category: dbCard.category,
    order: dbCard.order_index,
    createdAt: dbCard.created_at,
    updatedAt: dbCard.updated_at,
    startDate: dbCard.start_date || undefined,
    endDate: dbCard.end_date || undefined,
  };
}

export function useKanbanBoard() {
  const [cards, setCards] = useState<KanbanCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const dbCards = await fetchKanbanCards();
      setCards(dbCards.map(dbToKanbanCard));
    } catch (err) {
      console.error("칸반 카드 로드 실패:", err);
      setError("카드를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCardsByStatus = useCallback((status: TaskStatus): KanbanCard[] => {
    return cards
      .filter((card) => card.status === status)
      .sort((a, b) => a.order - b.order);
  }, [cards]);

  const addCard = useCallback(async (cardData: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: "high" | "medium" | "low";
    category: string;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      const newCard = await createKanbanCard({
        title: cardData.title,
        description: cardData.description,
        status: cardData.status,
        priority: cardData.priority,
        category: cardData.category,
        start_date: cardData.startDate,
        end_date: cardData.endDate,
      });
      
      setCards((prev) => [...prev, dbToKanbanCard(newCard)]);
      setIsAddingCard(false);
      setAddingToColumn(null);
    } catch (err) {
      console.error("카드 추가 실패:", err);
      setError("카드 추가에 실패했습니다.");
    }
  }, []);

  const updateCard = useCallback(async (cardId: number, updates: Partial<KanbanCard>) => {
    try {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.order !== undefined) dbUpdates.order_index = updates.order;
      if (updates.startDate !== undefined) dbUpdates.start_date = updates.startDate || null;
      if (updates.endDate !== undefined) dbUpdates.end_date = updates.endDate || null;

      const updatedCard = await updateKanbanCard(cardId, dbUpdates as any);
      
      setCards((prev) => prev.map((card) => 
        card.id === cardId ? dbToKanbanCard(updatedCard) : card
      ));
      setEditingCard(null);
    } catch (err) {
      console.error("카드 수정 실패:", err);
      setError("카드 수정에 실패했습니다.");
    }
  }, []);

  const deleteCard = useCallback(async (cardId: number) => {
    try {
      await deleteKanbanCard(cardId);
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error("카드 삭제 실패:", err);
      setError("카드 삭제에 실패했습니다.");
    }
  }, []);

  const changeStatus = useCallback(async (cardId: number, newStatus: TaskStatus) => {
    try {
      const cardsInNewColumn = cards.filter((c) => c.status === newStatus && c.id !== cardId);
      const maxOrder = cardsInNewColumn.length > 0 
        ? Math.max(...cardsInNewColumn.map((c) => c.order)) 
        : -1;

      await reorderKanbanCard(cardId, newStatus, maxOrder + 1);
      
      // 로컬 상태 업데이트
      setCards((prev) => prev.map((c) => 
        c.id === cardId 
          ? { ...c, status: newStatus, order: maxOrder + 1, updatedAt: new Date().toISOString() }
          : c
      ));
    } catch (err) {
      console.error("상태 변경 실패:", err);
      setError("상태 변경에 실패했습니다.");
    }
  }, [cards]);

  const reorderCard = useCallback(async (cardId: number, newStatus: TaskStatus, targetIndex: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    // 낙관적 업데이트: 먼저 로컬 상태 변경
    const cardsInTargetColumn = cards
      .filter((c) => c.status === newStatus && c.id !== cardId)
      .sort((a, b) => a.order - b.order);

    const updatedCardsInColumn = [
      ...cardsInTargetColumn.slice(0, targetIndex),
      { ...card, status: newStatus },
      ...cardsInTargetColumn.slice(targetIndex),
    ];

    const orderUpdates: Map<number, number> = new Map();
    updatedCardsInColumn.forEach((c, index) => {
      orderUpdates.set(c.id, index);
    });

    setCards((prev) => prev.map((c) => {
      if (c.id === cardId) {
        return { 
          ...c, 
          status: newStatus, 
          order: orderUpdates.get(c.id) ?? c.order,
          updatedAt: new Date().toISOString(),
        };
      }
      if (c.status === newStatus && orderUpdates.has(c.id)) {
        return { ...c, order: orderUpdates.get(c.id)! };
      }
      return c;
    }));

    // 서버에 업데이트
    try {
      await reorderKanbanCard(cardId, newStatus, targetIndex);
    } catch (err) {
      console.error("순서 변경 실패:", err);
      setError("순서 변경에 실패했습니다.");
      // 실패 시 다시 로드
      loadCards();
    }
  }, [cards]);

  const startAddingCard = useCallback((column: TaskStatus) => {
    setIsAddingCard(true);
    setAddingToColumn(column);
  }, []);

  const cancelAddingCard = useCallback(() => {
    setIsAddingCard(false);
    setAddingToColumn(null);
  }, []);

  const startEditingCard = useCallback((card: KanbanCard) => {
    setEditingCard(card);
  }, []);

  const cancelEditingCard = useCallback(() => {
    setEditingCard(null);
  }, []);

  const refreshCards = useCallback(() => {
    loadCards();
  }, []);

  return {
    cards,
    isLoading,
    error,
    editingCard,
    isAddingCard,
    addingToColumn,
    getCardsByStatus,
    addCard,
    updateCard,
    deleteCard,
    changeStatus,
    reorderCard,
    startAddingCard,
    cancelAddingCard,
    startEditingCard,
    cancelEditingCard,
    refreshCards,
  };
}
