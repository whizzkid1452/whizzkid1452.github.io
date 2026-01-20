import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  X,
  Minimize2,
  Maximize2,
  Heart,
  Sparkles,
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  Settings,
  Edit3,
  Zap,
  CheckCircle,
  Trash2,
  Inbox,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

interface WorkRecord {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  leaveType: string;
  workHours: string;
  diff: string;
}

interface WorkSettings {
  targetHours: number;
  lunchMinutes: number;
  userName: string;
  usedLeaveDays: number;
  totalLeaveDays: number;
}

const LEAVE_TYPES = {
  none: {
    label: "정상 근무",
    labelEn: "WORK",
    hours: 0,
    leaveValue: 0,
    color: "bg-gradient-to-r from-indigo-400 to-purple-400 text-white",
  },
  half_am: {
    label: "오전 반차",
    labelEn: "AM HALF",
    hours: 4,
    leaveValue: 0.5,
    color: "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
  },
  half_pm: {
    label: "오후 반차",
    labelEn: "PM HALF",
    hours: 4,
    leaveValue: 0.5,
    color: "bg-gradient-to-r from-orange-400 to-red-400 text-white",
  },
  full: {
    label: "연차",
    labelEn: "FULL",
    hours: 8,
    leaveValue: 1.0,
    color: "bg-gradient-to-r from-rose-400 to-pink-400 text-white",
  },
  half_half: {
    label: "반반차",
    labelEn: "QUARTER",
    hours: 2,
    leaveValue: 0.25,
    color: "bg-gradient-to-r from-emerald-400 to-teal-400 text-white",
  },
};

export function RetroWorkLog() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [settings, setSettings] = useState<WorkSettings>({
    targetHours: 8,
    lunchMinutes: 60,
    userName: "사용자",
    usedLeaveDays: 0,
    totalLeaveDays: 15,
  });

  const [records, setRecords] = useState<WorkRecord[]>([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [leaveType, setLeaveType] = useState("none");

  // Load from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("retro-work-settings");
    const savedRecords = localStorage.getItem("retro-work-records");

    if (savedSettings) {
      const loadedSettings = JSON.parse(savedSettings);
      setSettings(loadedSettings);
    }

    if (savedRecords) {
      const loadedRecords = JSON.parse(savedRecords);
      setRecords(loadedRecords);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("retro-work-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("retro-work-records", JSON.stringify(records));
  }, [records]);

  // Load today's record
  useEffect(() => {
    const todayRec = records.find((r) => r.date === currentDate);
    if (todayRec) {
      setStartTime(todayRec.startTime === "-" ? "" : todayRec.startTime);
      setEndTime(todayRec.endTime === "-" ? "" : todayRec.endTime);
      setLeaveType(todayRec.leaveType || "none");
    } else {
      setStartTime("");
      setEndTime("");
      setLeaveType("none");
    }
  }, [currentDate, records]);

  const formatMinutesToHM = (minutes: number) => {
    const absoluteMinutes = Math.abs(Math.round(minutes));
    const h = Math.floor(absoluteMinutes / 60);
    const m = absoluteMinutes % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  const formatHoursToHM = (hours: string | number) => {
    return formatMinutesToHM(parseFloat(hours.toString()) * 60);
  };

  const calculateMinutes = (start: string, end: string, type: string) => {
    if (type === "full") return 0;
    if (!start || !end) return 0;

    const [sH, sM] = start.split(":").map(Number);
    const [eH, eM] = end.split(":").map(Number);
    const totalMinutes = eH * 60 + eM - (sH * 60 + sM);
    const workMinutes = totalMinutes - settings.lunchMinutes;
    return Math.max(0, workMinutes);
  };

  const stats = useMemo(() => {
    let totalMinutes = 0;
    records.forEach((r) => {
      const workMin = parseFloat(r.workHours || "0") * 60;
      const leaveMin =
        (LEAVE_TYPES[r.leaveType as keyof typeof LEAVE_TYPES]?.hours || 0) * 60;
      totalMinutes += workMin + leaveMin;
    });

    const usedLeaveDays = settings.usedLeaveDays;
    const totalTargetMinutes = records.length * settings.targetHours * 60;
    const balanceMinutes = totalMinutes - totalTargetMinutes;

    return {
      totalWork: totalMinutes / 60,
      totalTarget: totalTargetMinutes / 60,
      balance: balanceMinutes / 60,
      totalWorkFormatted: formatMinutesToHM(totalMinutes),
      balanceFormatted:
        (balanceMinutes >= 0 ? "+" : "-") + formatMinutesToHM(balanceMinutes),
      usedLeaveDays,
      remainingLeaveDays: settings.totalLeaveDays - usedLeaveDays,
    };
  }, [records, settings]);

  const handleUpsertRecord = () => {
    if (!currentDate) return alert("날짜를 선택해주세요! 💕");

    const workMinutes = calculateMinutes(startTime, endTime, leaveType);
    const leaveMinutes =
      LEAVE_TYPES[leaveType as keyof typeof LEAVE_TYPES].hours * 60;
    const totalDailyMinutes = workMinutes + leaveMinutes;
    const targetMinutes = settings.targetHours * 60;
    const diffMinutes = totalDailyMinutes - targetMinutes;

    const newRecord: WorkRecord = {
      id: currentDate,
      date: currentDate,
      startTime: leaveType === "full" ? "-" : startTime || "-",
      endTime: leaveType === "full" ? "-" : endTime || "-",
      leaveType,
      workHours: (workMinutes / 60).toFixed(2),
      diff: (diffMinutes / 60).toFixed(2),
    };

    const oldRecord = records.find((r) => r.date === currentDate);
    const oldLeaveValue = oldRecord
      ? LEAVE_TYPES[oldRecord.leaveType as keyof typeof LEAVE_TYPES]?.leaveValue ?? 0
      : 0;
    const newLeaveValue =
      LEAVE_TYPES[leaveType as keyof typeof LEAVE_TYPES]?.leaveValue ?? 0;
    const deltaLeave = newLeaveValue - oldLeaveValue;

    setSettings((prev) => ({
      ...prev,
      usedLeaveDays: Math.max(0, prev.usedLeaveDays + deltaLeave),
    }));

    setRecords((prev) => {
      const filtered = prev.filter((r) => r.date !== currentDate);
      return [newRecord, ...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  };

  const handleResetAll = () => {
    if (confirm("모든 기록과 사용 연차를 초기화하시겠습니까? 💕")) {
      setRecords([]);
      setSettings((prev) => ({ ...prev, usedLeaveDays: 0 }));
      alert("초기화되었습니다! ✨");
    }
  };

  const downloadCSV = () => {
    const bridge = [
      ["날짜", "출근시간", "퇴근시간", "휴가구분", "근무시간", "차이"],
    ];
    records.forEach((r) =>
      bridge.push([
        r.date,
        r.startTime,
        r.endTime,
        LEAVE_TYPES[r.leaveType as keyof typeof LEAVE_TYPES].label,
        r.workHours,
        r.diff,
      ])
    );
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      bridge.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `workflow_report_${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 md:mb-8 relative">
      {/* Floating decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`work-heart-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${10 + i * 12}%`,
            left: i % 2 === 0 ? "auto" : `${5 + i * 3}%`,
            right: i % 2 === 0 ? `${5 + i * 3}%` : "auto",
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart
            className="w-3 h-3 md:w-4 md:h-4 fill-pink-400 text-pink-500 drop-shadow-[0_2px_4px_rgba(236,72,153,0.5)]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}

      {/* Floating stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`work-star-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles
            className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative"
        style={{
          borderTopColor: "#ffffff",
          borderLeftColor: "#ffffff",
          borderRightColor: "#808080",
          borderBottomColor: "#808080",
          imageRendering: "pixelated",
        }}
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#4169E1] via-[#6366F1] to-[#8B5CF6] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock
              className="w-4 h-4 text-white"
              style={{ imageRendering: "pixelated" }}
            />
            <span
              className="text-white text-xs"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                imageRendering: "pixelated",
              }}
            >
              WORKFLOW.EXE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: "#6366F1" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                imageRendering: "pixelated",
              }}
            >
              <Minimize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#6366F1" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                imageRendering: "pixelated",
              }}
            >
              <Maximize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff1493" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                imageRendering: "pixelated",
              }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {/* Menu Bar */}
              <div
                className="bg-white px-2 py-1 flex gap-3 text-[11px] border-b"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  borderBottomColor: "#808080",
                  imageRendering: "pixelated",
                }}
              >
                {["File", "Edit", "View", "Data", "Help"].map((menu) => (
                  <motion.button
                    key={menu}
                    whileHover={{ backgroundColor: "#E0E7FF", color: "#4338CA" }}
                    className="hover:bg-indigo-100 px-1 text-[9px]"
                  >
                    {menu}
                  </motion.button>
                ))}
              </div>

              <div className="p-4">
                {/* Header with Stats */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2
                      className="text-lg md:text-xl font-bold mb-1"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      WorkFlow
                    </h2>
                    <p
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      환영합니다, {settings.userName}님 ♡
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadCSV}
                      className="px-3 py-2 bg-white border-2 border-[#808080] text-xs flex items-center gap-1"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        imageRendering: "pixelated",
                      }}
                    >
                      <Download className="w-3 h-3" />
                      <span className="hidden md:inline">CSV</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResetAll}
                      className="px-3 py-2 bg-white border-2 border-[#808080] text-xs flex items-center gap-1"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        imageRendering: "pixelated",
                      }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden md:inline">초기화</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSettings(!showSettings)}
                      className="px-3 py-2 bg-white border-2 border-[#808080]"
                      style={{ imageRendering: "pixelated" }}
                    >
                      <Settings className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {/* Total Work */}
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-indigo-400 p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      <span
                        className="text-[8px] font-bold text-indigo-600"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        WORK
                      </span>
                    </div>
                    <div
                      className="text-xl font-bold text-indigo-700"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      {stats.totalWorkFormatted}
                    </div>
                    <div
                      className="text-[8px] text-indigo-500 mt-1"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      총 누적 근무
                    </div>
                  </div>

                  {/* Balance */}
                  <div
                    className={`bg-gradient-to-br p-3 border-4 ${
                      stats.balance >= 0
                        ? "from-emerald-100 to-teal-100 border-emerald-400"
                        : "from-rose-100 to-pink-100 border-rose-400"
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {stats.balance >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-rose-600" />
                      )}
                      <span
                        className={`text-[8px] font-bold ${
                          stats.balance >= 0
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        {stats.balance >= 0 ? "PLUS" : "MINUS"}
                      </span>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        stats.balance >= 0
                          ? "text-emerald-700"
                          : "text-rose-700"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      {stats.balanceFormatted}
                    </div>
                    <div
                      className={`text-[8px] mt-1 ${
                        stats.balance >= 0
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      초과/부족 상태
                    </div>
                  </div>

                  {/* Used Leave - 화면에서 바로 편집 */}
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 border-4 border-orange-400 p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Calendar className="w-3 h-3 text-orange-600" />
                      <span
                        className="text-[8px] font-bold text-orange-600"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        USED
                      </span>
                    </div>
                    <input
                      type="number"
                      min={0}
                      step={0.25}
                      className="w-full text-xl font-bold text-orange-700 bg-transparent border-2 border-orange-300 rounded px-1 py-0.5 focus:outline-none focus:border-orange-500"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                      value={settings.usedLeaveDays}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!Number.isNaN(val) && val >= 0) {
                          setSettings((prev) => ({
                            ...prev,
                            usedLeaveDays: val,
                          }));
                        }
                      }}
                    />
                    <div
                      className="text-[8px] text-orange-500 mt-1"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      사용 연차 (직접 입력)
                    </div>
                  </div>

                  {/* Remaining Leave */}
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-400 p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Heart className="w-3 h-3 text-pink-600 fill-pink-600" />
                      <span
                        className="text-[8px] font-bold text-pink-600"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        LEFT
                      </span>
                    </div>
                    <div
                      className="text-xl font-bold text-pink-700"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      {stats.remainingLeaveDays}
                    </div>
                    <div
                      className="text-[8px] text-pink-500 mt-1"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      잔여 연차
                    </div>
                  </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Input Panel */}
                  <div
                    className="lg:col-span-5 bg-white border-4 border-[#808080] p-4"
                    style={{ imageRendering: "pixelated" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Edit3 className="w-4 h-4 text-indigo-500" />
                      <h3
                        className="text-sm font-bold"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        기록하기
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {/* Date */}
                      <div>
                        <label
                          className="text-[9px] font-bold text-gray-600 mb-1 block"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          DATE
                        </label>
                        <input
                          type="date"
                          className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm"
                          style={{ fontFamily: "'DungGeunMo', monospace" }}
                          value={currentDate}
                          onChange={(e) => setCurrentDate(e.target.value)}
                        />
                      </div>

                      {/* Time */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label
                            className="text-[9px] font-bold text-gray-600 mb-1 block"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            START
                          </label>
                          <input
                            type="time"
                            disabled={leaveType === "full"}
                            className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm disabled:opacity-50"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            className="text-[9px] font-bold text-gray-600 mb-1 block"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            END
                          </label>
                          <input
                            type="time"
                            disabled={leaveType === "full"}
                            className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm disabled:opacity-50"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Leave Type */}
                      <div>
                        <label
                          className="text-[9px] font-bold text-gray-600 mb-1 block"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          TYPE
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(LEAVE_TYPES).map(([key, value]) => (
                            <motion.button
                              key={key}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setLeaveType(key)}
                              className={`py-2 px-2 text-[9px] font-bold border-2 transition-all ${
                                leaveType === key
                                  ? value.color +
                                    " border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                  : "bg-white border-gray-400 text-gray-700"
                              }`}
                              style={{
                                fontFamily: "'Press Start 2P', monospace",
                                imageRendering: "pixelated",
                              }}
                            >
                              {value.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            const now = new Date()
                              .toTimeString()
                              .slice(0, 5);
                            if (!startTime) setStartTime(now);
                            else setEndTime(now);
                          }}
                          className="flex-1 bg-white border-2 border-gray-600 py-2 text-[9px] font-bold flex items-center justify-center gap-1"
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            imageRendering: "pixelated",
                          }}
                        >
                          <Zap className="w-3 h-3" />
                          NOW
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleUpsertRecord}
                          className="flex-[1.5] bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-2 border-black py-2 text-[9px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            imageRendering: "pixelated",
                          }}
                        >
                          <CheckCircle className="w-3 h-3" />
                          SAVE
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Records List */}
                  <div
                    className="lg:col-span-7 bg-white border-4 border-[#808080] p-4"
                    style={{ imageRendering: "pixelated" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="text-sm font-bold flex items-center gap-2"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        RECORDS
                      </h3>
                      <span
                        className="text-[9px] font-bold text-gray-500"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        {records.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {records.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                          <Inbox
                            className="w-12 h-12 mb-3 opacity-30"
                            style={{ imageRendering: "pixelated" }}
                          />
                          <p
                            className="text-xs"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            기록이 없습니다
                          </p>
                        </div>
                      ) : (
                        records.map((record) => (
                          <motion.div
                            key={record.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 p-3 relative group"
                            style={{ imageRendering: "pixelated" }}
                          >
                            <div className="grid grid-cols-12 gap-2 items-center">
                              {/* Date */}
                              <div className="col-span-3">
                                <div
                                  className="text-[8px] text-gray-500 mb-0.5"
                                  style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                  }}
                                >
                                  DATE
                                </div>
                                <div
                                  className="text-xs font-bold"
                                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                                >
                                  {new Date(record.date).toLocaleDateString(
                                    "ko-KR",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </div>
                              </div>

                              {/* Time */}
                              <div className="col-span-4">
                                <div
                                  className="text-[8px] text-gray-500 mb-0.5"
                                  style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                  }}
                                >
                                  TIME
                                </div>
                                <div
                                  className="flex items-center gap-1 text-xs font-bold"
                                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                                >
                                  <span>{record.startTime}</span>
                                  <ArrowRight className="w-2 h-2" />
                                  <span>{record.endTime}</span>
                                </div>
                              </div>

                              {/* Type */}
                              <div className="col-span-3">
                                <span
                                  className={`text-[7px] px-2 py-1 font-bold border-2 border-black ${
                                    LEAVE_TYPES[
                                      record.leaveType as keyof typeof LEAVE_TYPES
                                    ].color
                                  }`}
                                  style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    imageRendering: "pixelated",
                                  }}
                                >
                                  {
                                    LEAVE_TYPES[
                                      record.leaveType as keyof typeof LEAVE_TYPES
                                    ].labelEn
                                  }
                                </span>
                              </div>

                              {/* Hours */}
                              <div className="col-span-2 text-right">
                                <div
                                  className="text-xs font-bold"
                                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                                >
                                  {formatHoursToHM(record.workHours)}
                                </div>
                                <div
                                  className={`text-[8px] font-bold ${
                                    parseFloat(record.diff) >= 0
                                      ? "text-emerald-600"
                                      : "text-rose-600"
                                  }`}
                                  style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                  }}
                                >
                                  {parseFloat(record.diff) >= 0 ? "+" : "-"}
                                  {formatHoursToHM(
                                    Math.abs(parseFloat(record.diff))
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Delete Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                if (
                                  confirm("이 기록을 삭제하시겠습니까? 💕")
                                ) {
                                  const leaveValue =
                                    LEAVE_TYPES[
                                      record.leaveType as keyof typeof LEAVE_TYPES
                                    ]?.leaveValue ?? 0;
                                  setSettings((prev) => ({
                                    ...prev,
                                    usedLeaveDays: Math.max(
                                      0,
                                      prev.usedLeaveDays - leaveValue
                                    ),
                                  }));
                                  setRecords((prev) =>
                                    prev.filter((r) => r.id !== record.id)
                                  );
                                }
                              }}
                              className="absolute top-2 right-2 p-1 bg-white border-2 border-red-400 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ imageRendering: "pixelated" }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </motion.button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] w-full max-w-md mx-4"
              style={{
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
                imageRendering: "pixelated",
              }}
            >
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] px-2 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-white" />
                  <span
                    className="text-white text-xs"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    SETTINGS
                  </span>
                </div>
                <motion.button
                  whileHover={{ backgroundColor: "#ff1493" }}
                  onClick={() => setShowSettings(false)}
                  className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
                  style={{
                    borderTopColor: "#ffffff",
                    borderLeftColor: "#ffffff",
                    borderRightColor: "#808080",
                    borderBottomColor: "#808080",
                  }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>

              <div className="p-6 bg-white">
                <div className="space-y-4">
                  <div>
                    <label
                      className="text-[9px] font-bold text-gray-600 mb-1 block"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      USER NAME
                    </label>
                    <input
                      className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                      value={settings.userName}
                      onChange={(e) =>
                        setSettings({ ...settings, userName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-[9px] font-bold text-gray-600 mb-1 block"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        TARGET (h)
                      </label>
                      <input
                        type="number"
                        className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm"
                        style={{ fontFamily: "'DungGeunMo', monospace" }}
                        value={settings.targetHours}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            targetHours: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="text-[9px] font-bold text-gray-600 mb-1 block"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        LUNCH (m)
                      </label>
                      <input
                        type="number"
                        className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm"
                        style={{ fontFamily: "'DungGeunMo', monospace" }}
                        value={settings.lunchMinutes}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            lunchMinutes: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-[9px] font-bold text-gray-600 mb-1 block"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      TOTAL LEAVE
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      className="w-full bg-white border-2 border-gray-400 px-3 py-2 text-sm"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                      value={settings.totalLeaveDays}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          totalLeaveDays: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="pt-4 border-t-2 border-gray-300">
                    <label
                      className="text-[9px] font-bold text-gray-600 mb-2 block"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      DATA MANAGE
                    </label>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (
                            confirm(
                              "모든 기록과 사용 연차를 초기화하시겠습니까? 💕"
                            )
                          ) {
                            setRecords([]);
                            setSettings((prev) => ({
                              ...prev,
                              usedLeaveDays: 0,
                            }));
                            setShowSettings(false);
                            alert("초기화되었습니다! ✨");
                          }
                        }}
                        className="flex-1 bg-gradient-to-r from-rose-400 to-pink-400 text-white border-2 border-black py-2 text-[9px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          imageRendering: "pixelated",
                        }}
                      >
                        RESET
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowSettings(false)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-2 border-black py-3 text-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      imageRendering: "pixelated",
                    }}
                  >
                    SAVE & CLOSE
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
