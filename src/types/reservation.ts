export interface ReservationFormData {
  date: string;
  time: string;
  partySize: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Reservation {
  _id: string;
  confirmationNumber: string;
  date: string;
  time: string;
  partySize: number;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export interface TimeSlot {
  time: string;
  available: boolean;
}
