import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMemoData } from "./useMemo";
import { useNotepad } from "./useNotepad";
import { windowBorderStyle } from "./Memo.styles";
import { MemoFloatingDecorations } from "./Memo.FloatingDecorations";
import { MemoTitleBar } from "./Memo.TitleBar";
import { MemoMenuBar } from "./Memo.MenuBar";
import { MemoEditorArea } from "./Memo.EditorArea";
import { MemoInfoBar } from "./Memo.InfoBar";
import { MemoNoteList } from "./Memo.NoteList";

export function Memo() {
  const [isMinimized, setIsMinimized] = useState(false);
  const { content, isLoading, error, handleChange, handleBlur } = useMemoData();
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    toggleNoteExpanded,
    expandAllNotes,
    collapseAllNotes,
    changeNoteColor,
  } = useNotepad();

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 md:mb-8 relative">
      <MemoFloatingDecorations />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative"
        style={windowBorderStyle}
      >
        <MemoTitleBar onMinimizeToggle={() => setIsMinimized((p) => !p)} />

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <MemoMenuBar />

              <div className="p-4">
                <MemoEditorArea
                  content={content}
                  isLoading={isLoading}
                  error={error}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MemoInfoBar />

                {/* 노트 리스트 */}
                <MemoNoteList
                  notes={notes}
                  onCreateNote={createNote}
                  onUpdateNote={updateNote}
                  onDeleteNote={deleteNote}
                  onToggleExpand={toggleNoteExpanded}
                  onExpandAll={expandAllNotes}
                  onCollapseAll={collapseAllNotes}
                  onChangeColor={changeNoteColor}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
