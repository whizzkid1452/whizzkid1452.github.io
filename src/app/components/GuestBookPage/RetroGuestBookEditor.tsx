import { motion } from "motion/react";
import { X, Save, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface GuestBookEntry {
  name: string;
  message: string;
  emoji: string;
}

interface GuestBookEditorProps {
  onClose: () => void;
  onSave: (entry: GuestBookEntry) => void;
}

const emojis = [
  "💌", "💝", "💖", "💗", "💕", "💓", "💞", "💟",
  "😊", "😍", "🥰", "😘", "🤗", "😄", "😁", "😆",
  "⭐", "✨", "🌟", "💫", "🎉", "🎊", "🎈", "🎁",
  "🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🌿", "🍀"
];

export function RetroGuestBookEditor({ onClose, onSave }: GuestBookEditorProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💌");

  const handleSave = () => {
    if (name.trim() || message.trim()) {
      onSave({
        name: name.trim() || "익명 • Anonymous",
        message: message.trim(),
        emoji: selectedEmoji,
      });
      onClose();
    }
  };

  const modalContent = (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
      />

      {/* Editor Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-[9999] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#e91e63] p-3 md:p-4 border-b-4 border-black flex items-center justify-between">
          <h2
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            GUEST BOOK • 방명록
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 bg-red-500 border-2 border-black hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {/* Name Input */}
          <div>
            <label
              className="block text-[#e91e63] text-xs md:text-sm mb-2 flex items-center gap-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <User className="w-4 h-4" />
              이름 • Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요... Enter your name..."
              className="w-full p-3 border-4 border-[#e91e63] bg-[#fce4ec] text-[#1a0033] text-sm focus:outline-none focus:border-[#c2185b]"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            />
          </div>

          {/* Emoji Selection */}
          <div>
            <label
              className="block text-[#9c27b0] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              이모지 선택 • Choose Emoji
            </label>
            <div className="grid grid-cols-8 gap-2 p-3 bg-[#f3e5f5] border-3 border-[#9c27b0] max-h-32 overflow-y-auto">
              {emojis.map((emoji) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-2 text-2xl border-2 border-black transition-colors ${
                    selectedEmoji === emoji
                      ? "bg-gradient-to-br from-[#9c27b0] to-[#ba68c8] border-[#7b1fa2]"
                      : "bg-white hover:bg-[#f3e5f5]"
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label
              className="block text-[#00bcd4] text-xs md:text-sm mb-2 flex items-center gap-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <MessageSquare className="w-4 h-4" />
              메시지 • Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="방명록에 메시지를 남겨주세요... Leave a message in the guest book..."
              className="w-full p-3 md:p-4 border-4 border-[#00bcd4] bg-[#e1f5fe] text-[#1a0033] text-xs md:text-sm resize-none focus:outline-none focus:border-[#0097a7] min-h-[200px] md:min-h-[250px]"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
              rows={10}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t-4 border-black bg-[#fce4ec] p-4 flex gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0]"
          >
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              취소 • Cancel
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              저장 • Save
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );

  // Portal을 사용하여 body에 직접 렌더링
  return typeof window !== "undefined" 
    ? createPortal(modalContent, document.body)
    : null;
}
