"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isMonday(date: Date): boolean {
  return date.getDay() === 1;
}

function isPast(date: Date, today: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d < t;
}

function isToday(date: Date, today: Date): boolean {
  return toLocalDateString(date) === toLocalDateString(today);
}

function buildCalendarGrid(year: number, month: number): (Date | null)[][] {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1);
  // ISO week: Monday = 0, ..., Sunday = 6
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  // Pad to complete last row
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

const MONTH_NAMES_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export default function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  const grid = useMemo(
    () => buildCalendarGrid(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  // Disable prev-month nav if we're already at the current month
  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  function handleDayClick(date: Date) {
    if (isMonday(date) || isPast(date, today)) return;
    onDateSelect(toLocalDateString(date));
  }

  return (
    <div className="bg-cream border border-sand rounded-2xl p-5 shadow-sm select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={isCurrentMonth}
          aria-label="Mois précédent"
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200",
            isCurrentMonth
              ? "text-sand cursor-not-allowed"
              : "text-charcoal hover:bg-sand active:bg-sand/80"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="font-display text-lg font-semibold text-indigo capitalize">
          {MONTH_NAMES_FR[viewMonth]} {viewYear}
        </h2>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Mois suivant"
          className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:bg-sand active:bg-sand/80 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-semibold text-charcoal/50 py-1"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-0.5">
            {week.map((date, di) => {
              if (!date) {
                return <div key={di} className="w-full aspect-square" />;
              }

              const dateStr = toLocalDateString(date);
              const disabled = isMonday(date) || isPast(date, today);
              const selected = dateStr === selectedDate;
              const todayDate = isToday(date, today);

              return (
                <button
                  key={di}
                  type="button"
                  onClick={() => handleDayClick(date)}
                  disabled={disabled}
                  aria-label={dateStr}
                  aria-pressed={selected}
                  className={cn(
                    "w-full aspect-square rounded-full text-sm font-medium transition-all duration-150 flex items-center justify-center",
                    // Base
                    !disabled && !selected && "text-charcoal hover:bg-saffron/15 active:bg-saffron/25",
                    // Today ring
                    todayDate && !selected && "ring-2 ring-saffron ring-offset-1",
                    // Selected
                    selected && "bg-saffron text-white shadow-md",
                    // Disabled
                    disabled && "text-charcoal/25 cursor-not-allowed line-through",
                    // Monday hint
                    isMonday(date) && "text-charcoal/20"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-charcoal/50">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full ring-2 ring-saffron" />
          Aujourd&apos;hui
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-saffron" />
          Sélectionné
        </span>
        <span className="flex items-center gap-1 line-through">Lun</span>
        <span>Fermé</span>
      </div>
    </div>
  );
}
