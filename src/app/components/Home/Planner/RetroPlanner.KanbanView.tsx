import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Task, TaskStatus } from "./RetroPlanner.types";
import { kanbanColumns, categoryColors } from "./RetroPlanner.constants";
import { getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerKanbanViewProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
  onReorder: (taskId: number, newStatus: TaskStatus, targetIndex: number) => void;
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

interface DragInfo {
  taskId: number;
  sourceStatus: TaskStatus;
}

interface KanbanColumnProps {
  columnId: TaskStatus;
  label: string;
  color: string;
  tasks: Task[];
  dragInfo: DragInfo | null;
  dropTargetIndex: number | null;
  onDragStart: (taskId: number, status: TaskStatus) => void;
  onDragEnd: () => void;
  onDrop: (taskId: number, newStatus: TaskStatus, targetIndex: number) => void;
  onDragOverCard: (index: number) => void;
  onDragLeaveColumn: () => void;
  onDeleteTask: (taskId: number) => void;
}

function KanbanCard({ 
  task,
  index,
  isBeingDragged,
  showDropIndicatorAbove,
  showDropIndicatorBelow,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDelete,
}: { 
  task: Task;
  index: number;
  isBeingDragged: boolean;
  showDropIndicatorAbove: boolean;
  showDropIndicatorBelow: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onDelete: (taskId: number) => void;
}) {
  const priorityColors = {
    high: { bg: "bg-red-100", border: "border-red-400", dot: "bg-red-500" },
    medium: { bg: "bg-yellow-100", border: "border-yellow-400", dot: "bg-yellow-500" },
    low: { bg: "bg-blue-100", border: "border-blue-400", dot: "bg-blue-500" },
  };

  const priorityStyle = priorityColors[task.priority];
  const categoryColor = categoryColors[task.category] || categoryColors["기타 Other"];

  return (
    <div className="relative">
      {/* Drop indicator above */}
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
          transition-shadow
          ${task.status === "done" ? "opacity-70" : ""}
          ${isBeingDragged ? "ring-2 ring-[#FF1493]" : ""}
        `}
        style={{ fontFamily: "'DungGeunMo', monospace" }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className={`text-xs font-bold flex-1 ${task.status === "done" ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="w-5 h-5 bg-white border-2 border-gray-400 text-[10px] hover:bg-red-200 hover:border-red-400 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 ${priorityStyle.dot}`} />
            {task.priority === "high" ? "높음" : task.priority === "medium" ? "보통" : "낮음"}
          </span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 ${categoryColor}`} />
            {task.category.split(" ")[0]}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 text-[9px] text-gray-500">
          <span>⏰ {task.time}</span>
          <span>📅 {task.date}</span>
        </div>
      </motion.div>

      {/* Drop indicator below (for last item) */}
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

function KanbanColumn({ 
  columnId, 
  label, 
  color, 
  tasks, 
  dragInfo,
  dropTargetIndex,
  onDragStart,
  onDragEnd,
  onDrop, 
  onDragOverCard,
  onDragLeaveColumn,
  onDeleteTask,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // 자식 요소로 이동할 때는 무시
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
      const targetIndex = dropTargetIndex !== null ? dropTargetIndex : tasks.length;
      onDrop(dragInfo.taskId, columnId, targetIndex);
    }
  };

  const handleEmptyAreaDragOver = () => {
    onDragOverCard(tasks.length);
  };

  return (
    <div 
      ref={columnRef}
      className={`
        flex-1 min-w-[280px] max-w-[400px]
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
        <span 
          className="bg-white text-black px-2 py-1 text-xs font-bold border-2 border-black"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Column Content */}
      <div 
        className={`
          flex-1 p-3 overflow-y-auto space-y-3 min-h-[300px]
          ${isDragOver ? "bg-pink-50" : "bg-gray-50"}
          transition-colors duration-200
        `}
        onDragOver={(e) => {
          e.preventDefault();
          if (tasks.length === 0) {
            handleEmptyAreaDragOver();
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-8 text-gray-400 ${isDragOver ? "ring-2 ring-dashed ring-[#FF1493] rounded-lg" : ""}`}
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="text-xs">태스크를 드래그해서</p>
              <p className="text-xs">여기에 놓으세요</p>
            </motion.div>
          ) : (
            tasks.map((task, index) => {
              const isBeingDragged = dragInfo?.taskId === task.id;
              const showDropIndicatorAbove = dropTargetIndex === index && !isBeingDragged;
              const showDropIndicatorBelow = dropTargetIndex === tasks.length && index === tasks.length - 1 && !isBeingDragged;
              
              return (
                <KanbanCard
                  key={task.id}
                  task={task}
                  index={index}
                  isBeingDragged={isBeingDragged}
                  showDropIndicatorAbove={showDropIndicatorAbove}
                  showDropIndicatorBelow={showDropIndicatorBelow}
                  onDragStart={() => onDragStart(task.id, columnId)}
                  onDragEnd={onDragEnd}
                  onDragOver={() => onDragOverCard(index)}
                  onDelete={onDeleteTask}
                />
              );
            })
          )}
        </AnimatePresence>
        
        {/* Drop zone at the bottom */}
        {tasks.length > 0 && (
          <div 
            className="h-8 mt-2"
            onDragOver={(e) => {
              e.preventDefault();
              onDragOverCard(tasks.length);
            }}
          />
        )}
      </div>
    </div>
  );
}

export function RetroPlannerKanbanView({
  tasks,
  onStatusChange,
  onReorder,
  onDeleteTask,
}: RetroPlannerKanbanViewProps) {
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const [dropTargetColumn, setDropTargetColumn] = useState<TaskStatus | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks
      .filter((task) => {
        const taskStatus = task.status || (task.completed ? "done" : "todo");
        return taskStatus === status;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const handleDragStart = (taskId: number, status: TaskStatus) => {
    setDragInfo({ taskId, sourceStatus: status });
  };

  const handleDragEnd = () => {
    setDragInfo(null);
    setDropTargetColumn(null);
    setDropTargetIndex(null);
  };

  const handleDrop = (taskId: number, newStatus: TaskStatus, targetIndex: number) => {
    if (dragInfo) {
      onReorder(taskId, newStatus, targetIndex);
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

  return (
    <div className="p-4">
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
          드래그앤드롭으로 태스크 상태와 순서를 변경하세요
        </p>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            columnId={column.id as TaskStatus}
            label={column.label}
            color={column.color}
            tasks={getTasksByStatus(column.id as TaskStatus)}
            dragInfo={dragInfo}
            dropTargetIndex={dropTargetColumn === column.id ? dropTargetIndex : null}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onDragOverCard={(index) => handleDragOverCard(column.id as TaskStatus, index)}
            onDragLeaveColumn={handleDragLeaveColumn}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      {/* Stats */}
      <div 
        className="mt-6 flex justify-center gap-4 flex-wrap"
        style={{ fontFamily: "'DungGeunMo', monospace" }}
      >
        {kanbanColumns.map((column) => {
          const count = getTasksByStatus(column.id as TaskStatus).length;
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
      </div>
    </div>
  );
}
