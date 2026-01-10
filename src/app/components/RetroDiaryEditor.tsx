import { motion } from "motion/react";
import { X, Save, Smile, Meh, Frown, Sun, Cloud, CloudRain, Snowflake } from "lucide-react";
import { useState } from "react";

interface DiaryEntry {
  title: string;
  titleKo: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  weather: string;
}

interface DiaryEditorProps {
  onClose: () => void;
  onSave: (entry: DiaryEntry) => void;
}

export function RetroDiaryEditor({ onClose, onSave }: DiaryEditorProps) {
  const [title, setTitle] = useState("");
  const [titleKo, setTitleKo] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<"happy" | "neutral" | "sad">("happy");
  const [weather, setWeather] = useState("맑음 ☀️ Sunny");

  const moods = [
    { value: "happy" as const, icon: Smile, label: "행복 Happy", color: "#4caf50" },
    { value: "neutral" as const, icon: Meh, label: "보통 Okay", color: "#ff9800" },
    { value: "sad" as const, icon: Frown, label: "슬픔 Sad", color: "#9c27b0" },
  ];

  const weathers = [
    { icon: Sun, label: "맑음 ☀️ Sunny" },
    { icon: Cloud, label: "흐림 ☁️ Cloudy" },
    { icon: CloudRain, label: "비 🌧️ Rainy" },
    { icon: Snowflake, label: "눈 ❄️ Snowy" },
  ];

  const handleSave = () => {
    if (title || titleKo || content) {
      onSave({
        title: title || "Untitled",
        titleKo: titleKo || "제목 없음",
        content,
        mood,
        weather,
      });
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      />

      {/* Editor Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-50 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#e91e63] p-3 md:p-4 border-b-4 border-black flex items-center justify-between">
          <h2
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            NEW DIARY • 새 일기
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
          {/* Mood Selection */}
          <div>
            <label
              className="block text-[#e91e63] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              오늘의 기분 • Today's Mood
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {moods.map((m) => {
                const Icon = m.icon;
                return (
                  <motion.button
                    key={m.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMood(m.value)}
                    className={`p-3 md:p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                      mood === m.value
                        ? "bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white"
                        : "bg-white hover:bg-[#fce4ec]"
                    }`}
                  >
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2"
                      style={{ color: mood === m.value ? "white" : m.color }}
                    />
                    <span
                      className="text-[10px] md:text-xs"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {m.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Weather Selection */}
          <div>
            <label
              className="block text-[#9c27b0] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              오늘의 날씨 • Today's Weather
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {weathers.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.button
                    key={w.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWeather(w.label)}
                    className={`p-2 md:p-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                      weather === w.label
                        ? "bg-gradient-to-br from-[#9c27b0] to-[#ba68c8] text-white"
                        : "bg-white hover:bg-[#f3e5f5]"
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1" />
                    <span
                      className="text-[9px] md:text-[10px] block"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {w.label.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Title Input (English) */}
          <div>
            <label
              className="block text-[#00bcd4] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              제목 (English) • Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full p-3 border-4 border-[#00bcd4] bg-[#e1f5fe] text-[#1a0033] text-sm focus:outline-none focus:border-[#0097a7]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            />
          </div>

          {/* Title Input (Korean) */}
          <div>
            <label
              className="block text-[#00bcd4] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              제목 (한글) • Title (Korean)
            </label>
            <input
              type="text"
              value={titleKo}
              onChange={(e) => setTitleKo(e.target.value)}
              placeholder="제목을 입력하세요..."
              className="w-full p-3 border-4 border-[#00bcd4] bg-[#e1f5fe] text-[#1a0033] text-sm focus:outline-none focus:border-[#0097a7]"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label
              className="block text-[#4caf50] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              내용 • Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루를 기록해보세요... Write about your day..."
              className="w-full p-3 md:p-4 border-4 border-[#4caf50] bg-[#e8f5e9] text-[#1a0033] text-xs md:text-sm resize-none focus:outline-none focus:border-[#388e3c] min-h-[200px] md:min-h-[250px]"
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
}
