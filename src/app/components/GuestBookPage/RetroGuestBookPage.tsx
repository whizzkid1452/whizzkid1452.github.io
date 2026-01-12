import { motion, AnimatePresence } from "motion/react";
import { RetroGuestBookCard } from "./RetroGuestBookCard";
import { RetroGuestBookEditor } from "./RetroGuestBookEditor";
import { MessageSquare, PenTool, Heart, Star, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useBackButton } from "../../contexts/BackButtonContext";
import { loadGuestBooks } from "../../diary/loadDiaries";
import type { GuestBookEntry } from "../../diary/utils";

export function RetroGuestBookPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<GuestBookEntry | null>(null);
  
  // 마크다운 파일에서 방명록 로드
  const loadedEntries = loadGuestBooks();
  const [entries, setEntries] = useState<GuestBookEntry[]>(loadedEntries);

  const handleSaveEntry = (entry: {
    name: string;
    message: string;
    emoji: string;
  }) => {
    const now = new Date();
    const newEntry: GuestBookEntry = {
      id: Date.now(),
      date: now.toLocaleDateString("ko-KR").replace(/\. /g, ".").replace(".", ""),
      time: now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }),
      ...entry,
    };
    setEntries([newEntry, ...entries]);
  };

  const handleDeleteEntry = (id: number) => {
    if (confirm("정말 이 방명록을 삭제하시겠습니까? Are you sure you want to delete this entry?")) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const handleEntryClick = (entry: GuestBookEntry) => {
    setSelectedEntry(entry);
  };

  const { setHasBackButton } = useBackButton();

  const handleCloseDetail = () => {
    setSelectedEntry(null);
  };

  useEffect(() => {
    setHasBackButton(selectedEntry !== null);
  }, [selectedEntry, setHasBackButton]);

  // Detail View
  if (selectedEntry) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4 pt-16 md:pt-20">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCloseDetail}
          className="fixed top-4 left-4 md:left-6 lg:left-[280px] z-50 flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#e91e63]"
        >
          <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            방명록으로 • Back to Guest Book
          </span>
        </motion.button>

        <motion.article
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#9c27b0] p-4 md:p-6 border-b-4 border-black">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl md:text-5xl">{selectedEntry.emoji || "💌"}</div>
              <div>
                <h1
                  className="text-white text-sm md:text-lg"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {selectedEntry.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-[#fce4ec] p-4 border-b-2 border-[#ec407a]">
            <div className="flex items-center gap-4 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="text-[#e91e63]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  📅 {selectedEntry.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[#9c27b0]"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  🕐 {selectedEntry.time}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-12">
            <div
              className="text-[#1a0033] text-sm md:text-base leading-loose whitespace-pre-line"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {selectedEntry.message}
            </div>

            {/* Decorative Elements */}
            <div className="mt-8 flex justify-center gap-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#e91e63] fill-[#e91e63] opacity-50" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd0] p-4 border-t-4 border-[#ec407a] text-center">
            <p
              className="text-[#9c27b0] text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              ♥ 소중한 메시지 • Precious Message ♥
            </p>
          </div>
        </motion.article>
      </div>
    );
  }

  // List View
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 md:mt-8 px-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#9c27b0] via-[#e91e63] to-[#f06292] p-4 md:p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
          <h1
            className="text-white text-base md:text-xl text-center"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            GUEST BOOK
          </h1>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
        </div>
        <p
          className="text-white/90 text-center text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          방문해주셔서 감사합니다 • Thank You for Visiting
        </p>
      </motion.div>

      {/* New Entry Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <PenTool className="w-5 h-5 md:w-6 md:h-6" />
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            방명록 작성 • Write Message
          </span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6"
      >
        <div className="bg-gradient-to-br from-[#e91e63] to-[#f06292] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {entries.length}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            총 방명록 • Total
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#4caf50] to-[#66bb6a] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {new Set(entries.map(e => e.name)).size}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            방문자 수 • Visitors
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#00bcd4] to-[#26c6da] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {entries.length > 0 ? entries[0].date : "-"}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            최신 방문 • Latest
          </div>
        </div>
      </motion.div>

      {/* Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {entries.map((entry, index) => (
          <RetroGuestBookCard
            key={entry.id}
            {...entry}
            delay={0.6 + index * 0.1}
            onClick={() => handleEntryClick(entry)}
            onDelete={handleDeleteEntry}
          />
        ))}
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-12 text-center"
        >
          <MessageSquare className="w-16 h-16 text-[#e91e63] mx-auto mb-4 opacity-50" />
          <p
            className="text-[#9c27b0] text-sm md:text-base mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            NO MESSAGES YET
          </p>
          <p
            className="text-[#4a0066] text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            첫 방명록을 작성해보세요! • Write your first message!
          </p>
        </motion.div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <RetroGuestBookEditor
            onClose={() => setShowEditor(false)}
            onSave={handleSaveEntry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
