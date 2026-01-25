import { createContext, useContext, ReactNode } from "react";
import { useKanbanBoard } from "./useKanbanBoard";
import type { KanbanCard, TaskStatus } from "./RetroPlanner.types";

interface KanbanContextType {
  cards: KanbanCard[];
  isLoading: boolean;
  error: string | null;
  editingCard: KanbanCard | null;
  isAddingCard: boolean;
  addingToColumn: TaskStatus | null;
  getCardsByStatus: (status: TaskStatus) => KanbanCard[];
  addCard: (cardData: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: "high" | "medium" | "low";
    category: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  updateCard: (cardId: number, updates: Partial<KanbanCard>) => void;
  deleteCard: (cardId: number) => void;
  changeStatus: (cardId: number, newStatus: TaskStatus) => void;
  reorderCard: (cardId: number, newStatus: TaskStatus, targetIndex: number) => void;
  startAddingCard: (column: TaskStatus) => void;
  cancelAddingCard: () => void;
  startEditingCard: (card: KanbanCard) => void;
  cancelEditingCard: () => void;
  refreshCards: () => void;
}

const KanbanContext = createContext<KanbanContextType | null>(null);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const kanbanBoard = useKanbanBoard();

  return (
    <KanbanContext.Provider value={kanbanBoard}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanbanContext() {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanbanContext must be used within KanbanProvider");
  }
  return context;
}
