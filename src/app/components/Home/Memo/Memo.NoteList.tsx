import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  ChevronDown, 
  Trash2, 
  StickyNote,
  ChevronsUpDown,
  Palette
} from "lucide-react";
import type { Note } from "./Memo.types";
import { windowButtonStyle, fontDungGeunMo, fontPressStart2P } from "./Memo.styles";

interface MemoNoteListProps {
  notes: Note[];
  onCreateNote: () => void;
  onUpdateNote: (id: string, updates: { title?: string; content?: string }) => void;
  onDeleteNote: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onChangeColor: (id: string) => void;
}

export function MemoNoteList({
  notes,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onToggleExpand,
  onExpandAll,
  onCollapseAll,
  onChangeColor,
}: MemoNoteListProps) {
  const hasNotes = notes.length > 0;
  const allExpanded = notes.length > 0 && notes.every((note) => note.isExpanded);

  return (
    <div className="mt-4">
      {/* 노트 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-purple-500" />
          <span 
            className="text-purple-700 text-xs"
            style={fontDungGeunMo}
          >
            Notes ({notes.length})
          </span>
        </div>
        <div className="flex items-center gap-1">
          {hasNotes && (
            <button
              onClick={allExpanded ? onCollapseAll : onExpandAll}
              className="w-6 h-6 bg-[#c0c0c0] border flex items-center justify-center hover:bg-gray-300 transition-colors"
              style={windowButtonStyle}
              title={allExpanded ? "모두 접기" : "모두 펼치기"}
            >
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={onCreateNote}
            className="w-6 h-6 bg-[#c0c0c0] border flex items-center justify-center hover:bg-gray-300 transition-colors"
            style={windowButtonStyle}
            title="새 노트 추가"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 노트 리스트 */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {!hasNotes ? (
          <div 
            className="text-center py-6 border-2 border-dashed border-purple-200 bg-purple-50/50 rounded"
            style={fontDungGeunMo}
          >
            <StickyNote className="w-8 h-8 mx-auto mb-2 text-purple-300" />
            <p className="text-purple-500 text-xs mb-1">노트가 없습니다</p>
            <p className="text-purple-400 text-[10px]">+ 버튼을 눌러 새 노트를 추가하세요</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onUpdate={onUpdateNote}
                onDelete={onDeleteNote}
                onToggleExpand={onToggleExpand}
                onChangeColor={onChangeColor}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, updates: { title?: string; content?: string }) => void;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onChangeColor: (id: string) => void;
}

function NoteItem({ note, onUpdate, onDelete, onToggleExpand, onChangeColor }: NoteItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="border-2 overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
      style={{
        backgroundColor: note.color,
        borderTopColor: "#ffffff",
        borderLeftColor: "#ffffff",
        borderRightColor: "#808080",
        borderBottomColor: "#808080",
        imageRendering: "pixelated",
      }}
    >
      {/* 노트 헤더 */}
      <div 
        className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:brightness-95 transition-all"
        onClick={() => onToggleExpand(note.id)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <motion.div
            animate={{ rotate: note.isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3 text-gray-600 flex-shrink-0" />
          </motion.div>
          <input
            type="text"
            value={note.title}
            onChange={(e) => onUpdate(note.id, { title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent text-xs font-bold flex-1 min-w-0 focus:outline-none focus:underline truncate"
            style={fontDungGeunMo}
            placeholder="노트 제목..."
          />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChangeColor(note.id);
            }}
            className="w-5 h-5 flex items-center justify-center hover:bg-white/50 rounded transition-colors"
            title="색상 변경"
          >
            <Palette className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("이 노트를 삭제하시겠습니까?")) {
                onDelete(note.id);
              }
            }}
            className="w-5 h-5 flex items-center justify-center hover:bg-red-200 rounded transition-colors"
            title="삭제"
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
      </div>

      {/* 노트 내용 */}
      <AnimatePresence>
        {note.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pb-2">
              <textarea
                value={note.content}
                onChange={(e) => onUpdate(note.id, { content: e.target.value })}
                className="w-full min-h-[70px] bg-white/80 border border-gray-300 p-2 text-xs resize-none focus:outline-none focus:border-purple-400"
                style={fontDungGeunMo}
                placeholder="내용을 입력하세요..."
              />
              <div 
                className="text-[8px] text-gray-500 mt-1 text-right"
                style={fontPressStart2P}
              >
                {new Date(note.updatedAt).toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
