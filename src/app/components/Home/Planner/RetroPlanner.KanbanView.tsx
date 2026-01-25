import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { KanbanCard, TaskStatus } from "./RetroPlanner.types";
import { kanbanColumns, categoryColors } from "./RetroPlanner.constants";
import { getFontStyle } from "./RetroPlanner.styles";
import { useKanbanContext } from "./KanbanContext";

interface DragInfo {
  cardId: number;
  sourceStatus: TaskStatus;
}

// 카드 추가/수정 폼
function CardForm({
  initialData,
  targetStatus,
  onSave,
  onCancel,
}: {
  initialData?: KanbanCard;
  targetStatus: TaskStatus;
  onSave: (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: "high" | "medium" | "low";
    category: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [priority, setPriority] = useState<"high" | "medium" | "low">(initialData?.priority || "medium");
  const [category, setCategory] = useState(initialData?.category || "All");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");

  const categories = [
    "All",
    "Dev",
    "Art",
    "CEO",
    "Act",
    "Exc",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      status: initialData?.status || targetStatus,
      priority,
      category,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit}
      className="bg-white border-3 border-[#FF1493] p-3 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]"
      style={{ fontFamily: "'DungGeunMo', monospace" }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="카드 제목..."
        className="w-full px-2 py-1 border-2 border-gray-300 text-sm mb-2 focus:border-[#FF1493] outline-none"
        autoFocus
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명 (선택사항)..."
        className="w-full px-2 py-1 border-2 border-gray-300 text-xs mb-2 resize-none h-16 focus:border-[#FF1493] outline-none"
      />

      <div className="flex gap-2 mb-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
          className="flex-1 px-2 py-1 border-2 border-gray-300 text-xs focus:border-[#FF1493] outline-none"
        >
          <option value="high">🔴 높음</option>
          <option value="medium">🟡 보통</option>
          <option value="low">🔵 낮음</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-2 py-1 border-2 border-gray-300 text-xs focus:border-[#FF1493] outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.split(" ")[0]}</option>
          ))}
        </select>
      </div>

      {/* 기간 설정 */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className="block text-[10px] text-gray-500 mb-1">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-2 py-1 border-2 border-gray-300 text-xs focus:border-[#FF1493] outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] text-gray-500 mb-1">종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
            className="w-full px-2 py-1 border-2 border-gray-300 text-xs focus:border-[#FF1493] outline-none"
          />
        </div>
      </div>
      {startDate && endDate && new Date(startDate) > new Date(endDate) && (
        <p className="text-[10px] text-red-500 mb-2">종료일은 시작일보다 이후여야 합니다</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-3 py-1 bg-[#FF1493] text-white text-xs border-2 border-[#C2185B] hover:bg-[#C2185B]"
        >
          {initialData ? "수정" : "추가"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 text-gray-700 text-xs border-2 border-gray-400 hover:bg-gray-300"
        >
          취소
        </button>
      </div>
    </motion.form>
  );
}

// 칸반 카드 컴포넌트
function KanbanCardItem({
  card,
  isBeingDragged,
  showDropIndicatorAbove,
  showDropIndicatorBelow,
  onDragStart,
  onDragEnd,
  onDragOver,
  onEdit,
  onDelete,
}: {
  card: KanbanCard;
  isBeingDragged: boolean;
  showDropIndicatorAbove: boolean;
  showDropIndicatorBelow: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const priorityColors = {
    high: { bg: "bg-red-100", border: "border-red-400", dot: "bg-red-500" },
    medium: { bg: "bg-yellow-100", border: "border-yellow-400", dot: "bg-yellow-500" },
    low: { bg: "bg-blue-100", border: "border-blue-400", dot: "bg-blue-500" },
  };

  const priorityStyle = priorityColors[card.priority];
  const categoryColor = categoryColors[card.category] || categoryColors["All"];

  return (
    <div className="relative">
      {showDropIndicatorAbove && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          className="h-1 bg-[#FF1493] rounded-full mb-2 shadow-[0_0_8px_rgba(255,20,147,0.6)]"
        />
      )}
      
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isBeingDragged ? 0.5 : 1, 
          scale: isBeingDragged ? 0.95 : 1,
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: isBeingDragged ? 0.95 : 1.02 }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver();
        }}
        className={`
          ${priorityStyle.bg} ${priorityStyle.border}
          border-3 p-3 cursor-grab active:cursor-grabbing
          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
          hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]
          transition-shadow group
          ${card.status === "done" ? "opacity-70" : ""}
          ${isBeingDragged ? "ring-2 ring-[#FF1493]" : ""}
        `}
        style={{ fontFamily: "'DungGeunMo', monospace" }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className={`text-xs font-bold flex-1 ${card.status === "done" ? "line-through text-gray-500" : ""}`}>
            {card.title}
          </h4>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="w-5 h-5 bg-white border-2 border-blue-400 text-[10px] hover:bg-blue-200 flex items-center justify-center"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="w-5 h-5 bg-white border-2 border-red-400 text-[10px] hover:bg-red-200 flex items-center justify-center"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {card.description && (
          <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 ${priorityStyle.dot}`} />
            {card.priority === "high" ? "높음" : card.priority === "medium" ? "보통" : "낮음"}
          </span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 ${categoryColor}`} />
            {card.category.split(" ")[0]}
          </span>
        </div>
      </motion.div>

      {showDropIndicatorBelow && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          className="h-1 bg-[#FF1493] rounded-full mt-2 shadow-[0_0_8px_rgba(255,20,147,0.6)]"
        />
      )}
    </div>
  );
}

// 칸반 컬럼 컴포넌트
function KanbanColumn({
  columnId,
  label,
  color,
  cards,
  dragInfo,
  dropTargetIndex,
  isAddingCard,
  editingCard,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOverCard,
  onDragLeaveColumn,
  onAddCard,
  onStartAddCard,
  onCancelAddCard,
  onEditCard,
  onStartEditCard,
  onCancelEditCard,
  onDeleteCard,
}: {
  columnId: TaskStatus;
  label: string;
  color: string;
  cards: KanbanCard[];
  dragInfo: DragInfo | null;
  dropTargetIndex: number | null;
  isAddingCard: boolean;
  editingCard: KanbanCard | null;
  onDragStart: (cardId: number, status: TaskStatus) => void;
  onDragEnd: () => void;
  onDrop: (cardId: number, newStatus: TaskStatus, targetIndex: number) => void;
  onDragOverCard: (index: number) => void;
  onDragLeaveColumn: () => void;
  onAddCard: (data: { title: string; description?: string; status: TaskStatus; priority: "high" | "medium" | "low"; category: string }) => void;
  onStartAddCard: () => void;
  onCancelAddCard: () => void;
  onEditCard: (cardId: number, data: Partial<KanbanCard>) => void;
  onStartEditCard: (card: KanbanCard) => void;
  onCancelEditCard: () => void;
  onDeleteCard: (cardId: number) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (columnRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsDragOver(false);
    onDragLeaveColumn();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (dragInfo) {
      const targetIndex = dropTargetIndex !== null ? dropTargetIndex : cards.length;
      onDrop(dragInfo.cardId, columnId, targetIndex);
    }
  };

  return (
    <div 
      ref={columnRef}
      className={`
        flex-shrink-0 w-[280px] md:w-[300px]
        bg-white border-4 border-black
        shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]
        flex flex-col
        transition-all duration-200
        ${isDragOver ? "border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)]" : ""}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div 
        className="px-4 py-3 border-b-4 border-black flex items-center justify-between"
        style={{ backgroundColor: color }}
      >
        <h3 
          className="text-sm font-bold text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
          style={getFontStyle("'Press Start 2P'")}
        >
          {label.split(" • ")[0]}
        </h3>
        <div className="flex items-center gap-2">
          <span 
            className="bg-white text-black px-2 py-1 text-xs font-bold border-2 border-black"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {cards.length}
          </span>
          <button
            onClick={onStartAddCard}
            className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div 
        className={`
          flex-1 p-3 overflow-y-auto space-y-3 min-h-[300px]
          ${isDragOver ? "bg-pink-50" : "bg-gray-50"}
          transition-colors duration-200
        `}
      >
        {/* Add Card Form */}
        <AnimatePresence>
          {isAddingCard && (
            <CardForm
              targetStatus={columnId}
              onSave={onAddCard}
              onCancel={onCancelAddCard}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {cards.length === 0 && !isAddingCard ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-8 text-gray-400 ${isDragOver ? "ring-2 ring-dashed ring-[#FF1493] rounded-lg" : ""}`}
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="text-xs">카드를 추가하거나</p>
              <p className="text-xs">드래그해서 놓으세요</p>
            </motion.div>
          ) : (
            cards.map((card, index) => {
              const isBeingDragged = dragInfo?.cardId === card.id;
              const showDropIndicatorAbove = dropTargetIndex === index && !isBeingDragged;
              const showDropIndicatorBelow = dropTargetIndex === cards.length && index === cards.length - 1 && !isBeingDragged;
              
              // 수정 중인 카드인 경우 폼 표시
              if (editingCard?.id === card.id) {
                return (
                  <CardForm
                    key={card.id}
                    initialData={card}
                    targetStatus={columnId}
                    onSave={(data) => onEditCard(card.id, data)}
                    onCancel={onCancelEditCard}
                  />
                );
              }

              return (
                <KanbanCardItem
                  key={card.id}
                  card={card}
                  isBeingDragged={isBeingDragged}
                  showDropIndicatorAbove={showDropIndicatorAbove}
                  showDropIndicatorBelow={showDropIndicatorBelow}
                  onDragStart={() => onDragStart(card.id, columnId)}
                  onDragEnd={onDragEnd}
                  onDragOver={() => onDragOverCard(index)}
                  onEdit={() => onStartEditCard(card)}
                  onDelete={() => onDeleteCard(card.id)}
                />
              );
            })
          )}
        </AnimatePresence>
        
        {/* Drop zone at the bottom */}
        {cards.length > 0 && (
          <div 
            className="h-8 mt-2"
            onDragOver={(e) => {
              e.preventDefault();
              onDragOverCard(cards.length);
            }}
          />
        )}
      </div>
    </div>
  );
}

export function RetroPlannerKanbanView() {
  const {
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
    reorderCard,
    startAddingCard,
    cancelAddingCard,
    startEditingCard,
    cancelEditingCard,
    refreshCards,
  } = useKanbanContext();

  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const [dropTargetColumn, setDropTargetColumn] = useState<TaskStatus | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleDragStart = (cardId: number, status: TaskStatus) => {
    setDragInfo({ cardId, sourceStatus: status });
  };

  const handleDragEnd = () => {
    setDragInfo(null);
    setDropTargetColumn(null);
    setDropTargetIndex(null);
  };

  const handleDrop = (cardId: number, newStatus: TaskStatus, targetIndex: number) => {
    if (dragInfo) {
      reorderCard(cardId, newStatus, targetIndex);
    }
    handleDragEnd();
  };

  const handleDragOverCard = (columnId: TaskStatus, index: number) => {
    setDropTargetColumn(columnId);
    setDropTargetIndex(index);
  };

  const handleDragLeaveColumn = () => {
    setDropTargetIndex(null);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="p-4 w-full">
        <div className="text-center py-16" style={{ fontFamily: "'DungGeunMo', monospace" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-4 inline-block"
          >
            ⏳
          </motion.div>
          <p className="text-lg text-[#FF1493]">칸반 카드 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="p-4 w-full">
        <div className="text-center py-16 bg-red-50 border-4 border-red-400" style={{ fontFamily: "'DungGeunMo', monospace" }}>
          <div className="text-4xl mb-4">❌</div>
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshCards}
            className="px-4 py-2 bg-[#FF1493] text-white border-3 border-[#C2185B] hover:bg-[#C2185B]"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {/* Kanban Header */}
      <div 
        className="text-center mb-6"
        style={getFontStyle("'Press Start 2P'")}
      >
        <h2 className="text-lg text-[#FF1493] mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          ✨ Kanban Board ✨
        </h2>
        <p 
          className="text-xs text-gray-600"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          각 컬럼의 + 버튼으로 카드를 추가하고, 드래그로 이동하세요
        </p>
      </div>

      {/* Kanban Columns */}
      <div 
        className="flex gap-4 pb-4 w-full overflow-x-auto min-w-0"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {kanbanColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            columnId={column.id as TaskStatus}
            label={column.label}
            color={column.color}
            cards={getCardsByStatus(column.id as TaskStatus)}
            dragInfo={dragInfo}
            dropTargetIndex={dropTargetColumn === column.id ? dropTargetIndex : null}
            isAddingCard={isAddingCard && addingToColumn === column.id}
            editingCard={editingCard}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onDragOverCard={(index) => handleDragOverCard(column.id as TaskStatus, index)}
            onDragLeaveColumn={handleDragLeaveColumn}
            onAddCard={addCard}
            onStartAddCard={() => startAddingCard(column.id as TaskStatus)}
            onCancelAddCard={cancelAddingCard}
            onEditCard={updateCard}
            onStartEditCard={startEditingCard}
            onCancelEditCard={cancelEditingCard}
            onDeleteCard={deleteCard}
          />
        ))}
      </div>

      {/* Stats */}
      <div 
        className="mt-6 flex justify-center gap-4 flex-wrap"
        style={{ fontFamily: "'DungGeunMo', monospace" }}
      >
        {kanbanColumns.map((column) => {
          const count = getCardsByStatus(column.id as TaskStatus).length;
          return (
            <div
              key={column.id}
              className="bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              <span 
                className="inline-block w-3 h-3 mr-2"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-xs">{column.label.split(" • ")[0]}: </span>
              <span className="font-bold text-sm">{count}</span>
            </div>
          );
        })}
        <div className="bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
          <span className="text-xs">전체: </span>
          <span className="font-bold text-sm">{cards.length}</span>
        </div>
      </div>
    </div>
  );
}
