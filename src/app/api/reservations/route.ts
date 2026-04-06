import { NextRequest, NextResponse } from "next/server";
// In production, import from "@/lib/wix-bookings" to create bookings via Wix Bookings API

interface ReservationRequestBody {
  date: string;
  time: string;
  partySize: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

function generateConfirmationNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "RES-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validateReservationBody(
  body: Partial<ReservationRequestBody>
): string | null {
  if (!body.date) return "date is required";
  if (!body.time) return "time is required";

  if (body.partySize === undefined || body.partySize === null) {
    return "partySize is required";
  }
  const size = Number(body.partySize);
  if (!Number.isInteger(size) || size < 1 || size > 10) {
    return "partySize must be an integer between 1 and 10";
  }

  if (!body.firstName) return "firstName is required";
  if (!body.lastName) return "lastName is required";
  if (!body.email) return "email is required";
  if (!body.phone) return "phone is required";

  // Validate date is in the future
  const reservationDate = new Date(body.date);
  if (isNaN(reservationDate.getTime())) {
    return "date must be a valid date string";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (reservationDate < today) {
    return "date must be in the future";
  }

  // Monday is day 1 in getDay() (0=Sunday, 1=Monday, ..., 6=Saturday)
  if (reservationDate.getDay() === 1) {
    return "reservations are not available on Mondays";
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<ReservationRequestBody> = await request.json();

    const validationError = validateReservationBody(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // In production: use Wix Bookings API to create the booking
    // const wixBooking = await createBooking({ ... });

    const reservationId = crypto.randomUUID();
    const confirmationNumber = generateConfirmationNumber();

    return NextResponse.json({
      success: true,
      reservationId,
      confirmationNumber,
      message: `Reservation ${confirmationNumber} has been confirmed for ${body.partySize} guest${(body.partySize ?? 1) > 1 ? "s" : ""} on ${body.date} at ${body.time}`,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
