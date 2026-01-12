import { taskStyles, textStyles, getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerStatsProps {
  totalCount: number;
  completedCount: number;
}

export function RetroPlannerStats({ totalCount, completedCount }: RetroPlannerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className={`${taskStyles.statsCard} from-pink-100 to-pink-200 border-pink-400`} style={{ imageRendering: "pixelated" }}>
        <div
          className={textStyles.statsNumber}
          style={getFontStyle("'Press Start 2P'")}
        >
          {totalCount}
        </div>
        <div className={textStyles.statsLabel} style={getFontStyle("'DungGeunMo'")}>
          전체 • Total
        </div>
      </div>
      <div className={`${taskStyles.statsCard} from-green-100 to-green-200 border-green-400`} style={{ imageRendering: "pixelated" }}>
        <div
          className="text-green-600 text-lg mb-0.5"
          style={getFontStyle("'Press Start 2P'")}
        >
          {completedCount}
        </div>
        <div className="text-green-700 text-[9px]" style={getFontStyle("'DungGeunMo'")}>
          완료 • Done
        </div>
      </div>
      <div className={`${taskStyles.statsCard} from-yellow-100 to-yellow-200 border-yellow-400`} style={{ imageRendering: "pixelated" }}>
        <div
          className="text-yellow-600 text-lg mb-0.5"
          style={getFontStyle("'Press Start 2P'")}
        >
          {totalCount - completedCount}
        </div>
        <div className="text-yellow-700 text-[9px]" style={getFontStyle("'DungGeunMo'")}>
          남음 • Left
        </div>
      </div>
    </div>
  );
}
