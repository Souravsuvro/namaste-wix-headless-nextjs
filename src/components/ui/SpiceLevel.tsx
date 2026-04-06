import { cn } from "@/lib/utils";
import { getSpiceLevelLabel } from "@/lib/utils";

export interface SpiceLevelProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  className?: string;
}

// Colors transitioning from green (mild) to red (hot) for levels 1–5
const pepperColors: Record<number, string> = {
  1: "#4ade80", // green-400
  2: "#a3e635", // lime-400
  3: "#facc15", // yellow-400
  4: "#f97316", // orange-500
  5: "#C23B22", // tandoori
};

function PepperIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 transition-colors duration-200"
      fill={active ? color : "#E5E7EB"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Simple chili pepper shape */}
      <path d="M12 2 C11 2 10 3 10 4 C10 5 11 5.5 12 5.5 C14 5.5 16 7 16.5 9.5 C17.5 14 14 19 11 21 C10.5 21.5 10.5 22 11 22 C11.5 22 12 21.8 12.5 21.2 C16 18 19.5 13 18.5 8.5 C17.8 5.2 15.2 2.5 12 2 Z" />
      <path d="M12 4.5 C12.5 4 13 3.5 13.5 3.5 C14 3.5 13.8 4.2 13 4.8 C12.5 5.1 12 5 12 4.5 Z" />
    </svg>
  );
}

export default function SpiceLevel({
  level,
  showLabel = true,
  className,
}: SpiceLevelProps) {
  const clampedLevel = Math.min(5, Math.max(0, level)) as 0 | 1 | 2 | 3 | 4 | 5;
  const label = getSpiceLevelLabel(clampedLevel);

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Niveau d'épice: ${label} (${clampedLevel}/5)`}
      title={label}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <PepperIcon
            key={i}
            active={i <= clampedLevel}
            color={pepperColors[i]}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-[#2D2926]/70 font-medium ml-1">
          {label}
        </span>
      )}
    </div>
  );
}
