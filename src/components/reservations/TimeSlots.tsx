"use client";

import { useMemo } from "react";
import { cn, generateTimeSlots } from "@/lib/utils";

export interface TimeSlotsProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  availableSlots?: string[];
}

const LUNCH_START = "12:00";
const LUNCH_END = "14:00";
const DINNER_START = "19:00";
const DINNER_END = "22:00";
const INTERVAL = 30;

function SlotButton({
  time,
  selected,
  available,
  onSelect,
}: {
  time: string;
  selected: boolean;
  available: boolean;
  onSelect: (time: string) => void;
}) {
  const disabled = !available;

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(time)}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`${time}${disabled ? " – indisponible" : ""}`}
      className={cn(
        "px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-150",
        // Default available
        available && !selected &&
          "border-sand bg-white text-charcoal hover:border-saffron hover:text-saffron active:bg-saffron/10",
        // Selected
        selected &&
          "border-saffron bg-saffron text-white shadow-md",
        // Disabled / unavailable
        disabled &&
          "border-sand/60 bg-sand/30 text-charcoal/30 cursor-not-allowed line-through"
      )}
    >
      {time}
    </button>
  );
}

interface ServiceSectionProps {
  label: string;
  icon: string;
  slots: string[];
  selectedTime: string;
  availableSet: Set<string>;
  onTimeSelect: (time: string) => void;
}

function ServiceSection({
  label,
  icon,
  slots,
  selectedTime,
  availableSet,
  onTimeSelect,
}: ServiceSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg" aria-hidden="true">{icon}</span>
        <h3 className="font-display text-base font-semibold text-indigo">{label}</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => (
          <SlotButton
            key={slot}
            time={slot}
            selected={selectedTime === slot}
            available={availableSet.size === 0 || availableSet.has(slot)}
            onSelect={onTimeSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function TimeSlots({
  selectedTime,
  onTimeSelect,
  availableSlots,
}: TimeSlotsProps) {
  const lunchSlots = useMemo(
    () => generateTimeSlots(LUNCH_START, LUNCH_END, INTERVAL),
    []
  );
  const dinnerSlots = useMemo(
    () => generateTimeSlots(DINNER_START, DINNER_END, INTERVAL),
    []
  );

  // Empty set means "all available"; populated set means "only these"
  const availableSet = useMemo(
    () => new Set(availableSlots ?? []),
    [availableSlots]
  );

  return (
    <div className="bg-cream border border-sand rounded-2xl p-5 shadow-sm space-y-6">
      <ServiceSection
        label="Déjeuner"
        icon="☀️"
        slots={lunchSlots}
        selectedTime={selectedTime}
        availableSet={availableSet}
        onTimeSelect={onTimeSelect}
      />
      <div className="border-t border-sand" />
      <ServiceSection
        label="Dîner"
        icon="🌙"
        slots={dinnerSlots}
        selectedTime={selectedTime}
        availableSet={availableSet}
        onTimeSelect={onTimeSelect}
      />

      {selectedTime && (
        <p className="text-xs text-charcoal/60 text-center pt-1">
          Créneau sélectionné&nbsp;:{" "}
          <span className="font-semibold text-saffron">{selectedTime}</span>
        </p>
      )}
    </div>
  );
}
