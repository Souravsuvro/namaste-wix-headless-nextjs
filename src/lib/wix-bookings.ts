import { getWixClient } from "./wix-client";

const client = getWixClient();

export async function getAvailability(
  serviceId: string,
  startDate: string,
  endDate: string
) {
  try {
    const response =
      await client.availabilityCalendar.queryAvailability(
        {
          filter: {
            serviceId: [serviceId],
            startDate,
            endDate,
          },
        }
      );
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
  additionalFields?: Record<string, string>;
}) {
  try {
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

export async function getBookingServices() {
  try {
    const { items } = await client.bookings.queryServices().find();
    return items;
  } catch (error) {
    console.error("Error fetching booking services:", error);
    return [];
  }
}
