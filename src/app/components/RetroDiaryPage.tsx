import { motion, AnimatePresence } from "motion/react";
import { RetroDiaryCard } from "./RetroDiaryCard";
import { RetroDiaryEditor } from "./RetroDiaryEditor";
import { Book, PenTool, Heart, Star, Sparkles } from "lucide-react";
import { useState } from "react";

interface DiaryEntry {
  id: number;
  date: string;
  time: string;
  title: string;
  titleKo: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  weather: string;
}

export function RetroDiaryPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntry | null>(null);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: "2024.12.31",
      time: "23:45",
      title: "END OF YEAR",
      titleKo: "한 해의 마지막 밤",
      content:
        "2024년의 마지막 날이에요. The last day of 2024. 올해도 많은 일들이 있었지만, 모두 소중한 추억이 되었습니다. Looking back at all the memories made this year. 내년에는 더 많은 픽셀 아트를 그리고 싶어요! 새해 복 많이 받으세요! 🎆",
      mood: "happy",
      weather: "맑음 ☀️ Sunny",
    },
    {
      id: 2,
      date: "2024.12.25",
      time: "18:30",
      title: "CHRISTMAS DAY",
      titleKo: "크리스마스 이브",
      content:
        "메리 크리스마스! Merry Christmas everyone! 오늘은 친구들과 함께 레트로 게임 대회를 했어요. We played retro games all day long. 슈퍼 마리오, 팩맨, 테트리스까지! 옛날 게임은 해도 해도 질리지 않네요. The simple joy of classic gaming never gets old! 🎮🎄",
      mood: "happy",
      weather: "눈 ❄️ Snowy",
    },
    {
      id: 3,
      date: "2024.12.20",
      time: "14:20",
      title: "RAINY AFTERNOON",
      titleKo: "비 오는 오후",
      content:
        "오늘은 하루 종일 비가 내렸어요. It rained all day today. 창밖을 보며 8비트 음악을 들었습니다. Listening to chiptune music while watching the rain. 비 오는 날의 감성과 레트로 음악이 참 잘 어울려요. The combination is just perfect for a cozy day. ☔🎵",
      mood: "neutral",
      weather: "비 🌧️ Rainy",
    },
    {
      id: 4,
      date: "2024.12.15",
      time: "21:15",
      title: "PIXEL PRACTICE",
      titleKo: "픽셀 아트 연습",
      content:
        "오늘 처음으로 32x32 캐릭터를 완성했어요! Completed my first 32x32 character today! 5시간이나 걸렸지만 정말 뿌듯합니다. Took 5 hours but totally worth it. 한 픽셀 한 픽셀 정성스럽게 찍다 보니 어느새 완성! Every pixel placed with care and love. 내일은 배경도 그려봐야겠어요! 💾✨",
      mood: "happy",
      weather: "흐림 ☁️ Cloudy",
    },
  ]);

  const handleSaveDiary = (entry: {
    title: string;
    titleKo: string;
    content: string;
    mood: "happy" | "neutral" | "sad";
    weather: string;
  }) => {
    const now = new Date();
    const newDiary: DiaryEntry = {
      id: Date.now(),
      date: now.toLocaleDateString("ko-KR").replace(/\. /g, ".").replace(".", ""),
      time: now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }),
      ...entry,
    };
    setDiaries([newDiary, ...diaries]);
  };

  const handleDeleteDiary = (id: number) => {
    if (confirm("정말 이 일기를 삭제하시겠습니까? Are you sure you want to delete this diary?")) {
      setDiaries(diaries.filter((d) => d.id !== id));
    }
  };

  const handleDiaryClick = (diary: DiaryEntry) => {
    setSelectedDiary(diary);
  };

  const handleCloseDetail = () => {
    setSelectedDiary(null);
  };

  // Detail View
  if (selectedDiary) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCloseDetail}
          className="flex items-center gap-2 px-4 py-2 mb-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#e91e63]"
        >
          <Book className="w-4 h-4 md:w-5 md:h-5" />
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            일기장으로 • Back to Diary
          </span>
        </motion.button>

        <motion.article
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#9c27b0] p-4 md:p-6 border-b-4 border-black">
            <h1
              className="text-white text-sm md:text-lg mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {selectedDiary.title}
            </h1>
            <h2
              className="text-white/90 text-base md:text-xl"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {selectedDiary.titleKo}
            </h2>
          </div>

          {/* Meta Info */}
          <div className="bg-[#fce4ec] p-4 border-b-2 border-[#ec407a]">
            <div className="flex items-center gap-4 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="text-[#e91e63]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  📅 {selectedDiary.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[#9c27b0]"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  🕐 {selectedDiary.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[#00bcd4]"
                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                >
                  {selectedDiary.weather}
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
              {selectedDiary.content}
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
              ♥ 소중한 추억 • Precious Memory ♥
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
            <Book className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
          <h1
            className="text-white text-base md:text-xl text-center"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            MY DIARY
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
          나의 소중한 일기장 • My Precious Diary
        </p>
      </motion.div>

      {/* New Diary Button */}
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
            새 일기 쓰기 • Write Diary
          </span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6"
      >
        <div className="bg-gradient-to-br from-[#e91e63] to-[#f06292] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {diaries.length}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            총 일기 • Total
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#4caf50] to-[#66bb6a] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {diaries.filter((d) => d.mood === "happy").length}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            행복한 날 • Happy
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#ff9800] to-[#ffa726] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {diaries.filter((d) => d.mood === "neutral").length}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            보통 날 • Okay
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#9c27b0] to-[#ba68c8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-center">
          <div
            className="text-white text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {diaries.filter((d) => d.mood === "sad").length}
          </div>
          <div
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            슬픈 날 • Sad
          </div>
        </div>
      </motion.div>

      {/* Diary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {diaries.map((diary, index) => (
          <RetroDiaryCard
            key={diary.id}
            {...diary}
            delay={0.6 + index * 0.1}
            onClick={() => handleDiaryClick(diary)}
            onDelete={handleDeleteDiary}
          />
        ))}
      </div>

      {/* Empty State */}
      {diaries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-12 text-center"
        >
          <Star className="w-16 h-16 text-[#e91e63] mx-auto mb-4 opacity-50" />
          <p
            className="text-[#9c27b0] text-sm md:text-base mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            NO DIARY YET
          </p>
          <p
            className="text-[#4a0066] text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            첫 일기를 작성해보세요! • Write your first diary!
          </p>
        </motion.div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <RetroDiaryEditor
            onClose={() => setShowEditor(false)}
            onSave={handleSaveDiary}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
