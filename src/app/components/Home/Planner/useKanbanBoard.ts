import { useState, useCallback } from "react";
import type { KanbanCard, TaskStatus } from "./RetroPlanner.types";

const initialKanbanCards: KanbanCard[] = [
  {
    id: 1,
    title: "프로젝트 기획서 작성",
    description: "새로운 프로젝트의 기획서를 작성합니다",
    status: "todo",
    priority: "high",
    category: "업무 Work",
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "디자인 시스템 구축",
    description: "컴포넌트 라이브러리 설계",
    status: "in_progress",
    priority: "high",
    category: "업무 Work",
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "TypeScript 학습",
    description: "고급 타입 시스템 이해하기",
    status: "in_progress",
    priority: "medium",
    category: "공부 Study",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "코드 리뷰 완료",
    description: "팀원 PR 리뷰",
    status: "done",
    priority: "medium",
    category: "업무 Work",
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useKanbanBoard() {
  const [cards, setCards] = useState<KanbanCard[]>(initialKanbanCards);
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  const getCardsByStatus = useCallback((status: TaskStatus): KanbanCard[] => {
    return cards
      .filter((card) => card.status === status)
      .sort((a, b) => a.order - b.order);
  }, [cards]);

  const addCard = useCallback((cardData: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: "high" | "medium" | "low";
    category: string;
  }) => {
    const cardsInColumn = cards.filter((c) => c.status === cardData.status);
    const maxOrder = cardsInColumn.length > 0 
      ? Math.max(...cardsInColumn.map((c) => c.order)) 
      : -1;

    const newCard: KanbanCard = {
      id: Date.now(),
      ...cardData,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCards((prev) => [...prev, newCard]);
    setIsAddingCard(false);
    setAddingToColumn(null);
  }, [cards]);

  const updateCard = useCallback((cardId: number, updates: Partial<KanbanCard>) => {
    setCards((prev) => prev.map((card) => 
      card.id === cardId 
        ? { ...card, ...updates, updatedAt: new Date().toISOString() }
        : card
    ));
    setEditingCard(null);
  }, []);

  const deleteCard = useCallback((cardId: number) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  }, []);

  const changeStatus = useCallback((cardId: number, newStatus: TaskStatus) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    const cardsInNewColumn = cards.filter((c) => c.status === newStatus && c.id !== cardId);
    const maxOrder = cardsInNewColumn.length > 0 
      ? Math.max(...cardsInNewColumn.map((c) => c.order)) 
      : -1;

    setCards((prev) => prev.map((c) => 
      c.id === cardId 
        ? { ...c, status: newStatus, order: maxOrder + 1, updatedAt: new Date().toISOString() }
        : c
    ));
  }, [cards]);

  const reorderCard = useCallback((cardId: number, newStatus: TaskStatus, targetIndex: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    // 해당 status의 카드들 가져오기 (드래그 중인 카드 제외)
    const cardsInTargetColumn = cards
      .filter((c) => c.status === newStatus && c.id !== cardId)
      .sort((a, b) => a.order - b.order);

    // 새 순서 계산
    const updatedCardsInColumn = [
      ...cardsInTargetColumn.slice(0, targetIndex),
      { ...card, status: newStatus },
      ...cardsInTargetColumn.slice(targetIndex),
    ];

    // order 값 재할당
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

  return {
    cards,
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
  };
}
