export interface SpecificTrip {
  id: number;
  tripDetails: string;
  departureLocation: string;
  arrivalLocation: string;
  size: number;
  description: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  parcelType: string;
  receiverFullName: string;
  receiverPhoneNumber: string;
  parcelDescription: string;
  parcelHeight: number;
  parcelWidth: number;
  parcelLength: number;
  photo: string;
  reservation: any; // Assuming reservation is an object, adjust type as needed
  trip_status: string;
}
