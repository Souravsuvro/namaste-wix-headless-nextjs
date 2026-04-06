"use client";

import { useState } from "react";
import type { ReservationFormData, TimeSlot } from "@/types/reservation";
import { generateTimeSlots } from "@/lib/utils";

export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lunchSlots: TimeSlot[] = generateTimeSlots("12:00", "14:00", 30).map(
    (time) => ({ time, available: true })
  );

  const dinnerSlots: TimeSlot[] = generateTimeSlots("19:00", "22:00", 30).map(
    (time) => ({ time, available: true })
  );

  const allSlots = [...lunchSlots, ...dinnerSlots];

  const submitReservation = async (data: ReservationFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An error occurred";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (date: string, partySize: number) => {
    // In production, call Wix Bookings API
    // For now, return all slots as available
    return allSlots;
  };

  return {
    lunchSlots,
    dinnerSlots,
    allSlots,
    loading,
    error,
    submitReservation,
    checkAvailability,
  };
}
