import { getWixClient } from "./wix-client";

export async function getAvailability(
  serviceId: string,
  startDate: string,
  endDate: string
) {
  try {
    const client = getWixClient();
    const response = await client.availabilityCalendar.queryAvailability({
      filter: {
        serviceId: [serviceId],
        startDate,
        endDate,
      },
    });
    return response.availabilityEntries || [];
  } catch (error) {
    console.error("Error fetching availability:", error);
    return [];
  }
}

export async function createBooking(bookingData: {
  serviceId: string;
  slot: {
    startDate: string;
    endDate: string;
    resource?: { id: string };
  };
  contactDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  numberOfParticipants: number;
}) {
  try {
    const client = getWixClient();
    const booking = await client.bookings.createBooking({
      bookedEntity: {
        slot: {
          startDate: bookingData.slot.startDate,
          endDate: bookingData.slot.endDate,
          serviceId: bookingData.serviceId,
          resource: bookingData.slot.resource,
        },
      },
      contactDetails: {
        firstName: bookingData.contactDetails.firstName,
        lastName: bookingData.contactDetails.lastName,
        email: bookingData.contactDetails.email,
        phone: bookingData.contactDetails.phone,
      },
      totalParticipants: bookingData.numberOfParticipants,
    });
    return booking;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
}
