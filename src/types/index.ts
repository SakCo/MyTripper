export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  class: 'economy' | 'premium' | 'business' | 'first';
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  image: string;
  amenities: string[];
  distance: string;
}

export interface Car {
  id: string;
  model: string;
  type: string;
  transmission: 'automatic' | 'manual';
  seats: number;
  price: number;
  company: string;
  image: string;
  features: string[];
}

export interface SearchFilters {
  priceRange: [number, number];
  stops?: number;
  airlines?: string[];
  departureTime?: string;
  class?: string;
  rating?: number;
  amenities?: string[];
  carType?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bookings: Booking[];
  priceAlerts: PriceAlert[];
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'car';
  details: any;
  status: 'confirmed' | 'pending' | 'cancelled';
  date: string;
  totalPrice: number;
}

export interface PriceAlert {
  id: string;
  route: string;
  targetPrice: number;
  isActive: boolean;
  created: string;
}