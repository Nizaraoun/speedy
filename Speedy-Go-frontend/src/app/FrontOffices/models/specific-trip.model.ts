export interface SpecificTrip {
  id: number;
  arrivalDate: string;
  arrivalLocation: string;
  arrivalTime: string;
  departureDate: string;
  departureLocation: string;
  departureTime: string;
  destination: string;
  price: number;
  tripDetails: string;
  vehicleType: string;
  trip_status: string; // Add this property if it exists in your API response
}
