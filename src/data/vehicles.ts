export interface Vehicle {
  id: string;
  name: string;
  type: "Bike" | "Scooter" | "Car";
  rating: number;
  specs: string;
  priceDay: number;
  priceHour: number;
  fuel: "Petrol" | "Electric";
  transmission: "Manual" | "Automatic";
  seats: number;
  image: string;
  deposit: number;
  engine?: string;
  gearbox?: string;
  reviewsCount?: number;
  gallery?: string[];
  features?: string[];
}

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: "re-classic-350",
    name: "Royal Enfield Classic 350",
    type: "Bike",
    rating: 4.8,
    specs: "350cc · Manual · 2 seats",
    priceDay: 500,
    priceHour: 50,
    fuel: "Petrol",
    transmission: "Manual",
    seats: 2,
    deposit: 2000,
    engine: "349 cc",
    gearbox: "5-speed",
    reviewsCount: 126,
    features: ["ABS", "Bluetooth navigation", "USB charging", "Helmet included"],
    image:
      "https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1763920227051-cba429369989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFya2VkJTIwcm9hZCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZnJvbnR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZGV0YWlsfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "honda-activa-6g",
    name: "Honda Activa 6G",
    type: "Scooter",
    rating: 4.7,
    specs: "110cc · Automatic · 2 seats",
    priceDay: 500,
    priceHour: 50,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 2,
    deposit: 800,
    engine: "109.5 cc",
    gearbox: "CVT Automatic",
    reviewsCount: 98,
    features: ["Combi-Brake System", "External Fuel Fill", "Underseat Storage", "2 Helmets Included"],
    image:
      "https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1596706059639-c5c2d308053a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwZnJvbnR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwZGV0YWlsfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "maruti-swift",
    name: "Maruti Swift",
    type: "Car",
    rating: 4.8,
    specs: "1197cc · Manual · 5 seats",
    priceDay: 1500,
    priceHour: 150,
    fuel: "Petrol",
    transmission: "Manual",
    seats: 5,
    deposit: 2000,
    engine: "1197 cc DualJet",
    gearbox: "5-speed Manual",
    reviewsCount: 142,
    features: ["Dual Airbags", "Touchscreen Infotainment", "Fastag Enabled", "AC & Power Windows"],
    image:
      "https://images.unsplash.com/photo-1596278693907-17a7151cf9f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoYXRjaGJhY2slMjBjYXIlMjByb2FkfGVufDF8MHx8fDE3OTE4ODE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1596278693907-17a7151cf9f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoYXRjaGJhY2slMjBjYXIlMjByb2FkfGVufDF8MHx8fDE3OTE4ODE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxzd2lmdCUyMGNhciUyMGZyb250fGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxjYXIlMjBpbnRlcmlvcnxlbnwxfDB8fHwxNzkxODgxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta",
    type: "Car",
    rating: 4.9,
    specs: "1497cc · Automatic · 5 seats",
    priceDay: 1500,
    priceHour: 150,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    deposit: 3000,
    engine: "1497 cc MPi",
    gearbox: "IVT Automatic",
    reviewsCount: 165,
    features: ["Panoramic Sunroof", "Ventilated Seats", "Bose Audio", "Cruise Control"],
    image:
      "https://images.unsplash.com/photo-1645791608306-6db92b84d498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxibGFjayUyMFNVViUyMHJvYWR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1645791608306-6db92b84d498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxibGFjayUyMFNVViUyMHJvYWR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxTVVYlMjBmcm9udHxlbnwxfDB8fHwxNzkxODgxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxjYXIlMjBpbnRlcmlvcnxlbnwxfDB8fHwxNzkxODgxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "tvs-jupiter",
    name: "TVS Jupiter",
    type: "Scooter",
    rating: 4.6,
    specs: "110cc · Automatic · 2 seats",
    priceDay: 500,
    priceHour: 50,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 2,
    deposit: 800,
    engine: "109.7 cc",
    gearbox: "CVT-i Automatic",
    reviewsCount: 74,
    features: ["EcoThrust Fuel Injection", "LED Headlamp", "Metal Body", "2 Helmets Included"],
    image:
      "https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1771575520403-df44ea769881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwY2l0eSUyMHN0cmVldCUyMEluZGlhfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1596706059639-c5c2d308053a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwZnJvbnR8ZW58MXwwfHx8MTc5MTg4MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwZGV0YWlsfGVufDF8MHx8fDE3OTE4ODE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    type: "Car",
    rating: 4.9,
    specs: "2393cc · Manual · 7 seats",
    priceDay: 1500,
    priceHour: 150,
    fuel: "Petrol",
    transmission: "Manual",
    seats: 7,
    deposit: 3500,
    engine: "2393 cc Diesel/Petrol",
    gearbox: "5-speed Manual",
    reviewsCount: 188,
    features: ["Captain Seats", "Triple-Zone Climate Control", "Long Distance Cruiser", "Ample Luggage Boot"],
    image:
      "https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxUb3lvdGElMjBJbm5vdmElMjBDcnlzdGElMjBzaWx2ZXIlMjBNUFYlMjBzdHVkaW98ZW58MXwwfHx8MTc5MTg4MTQ4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxUb3lvdGElMjBJbm5vdmElMjBDcnlzdGElMjBzaWx2ZXIlMjBNUFYlMjBzdHVkaW98ZW58MXwwfHx8MTc5MTg4MTQ4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxTVVYlMjBmcm9udHxlbnwxfDB8fHwxNzkxODgxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHxjYXIlMjBpbnRlcmlvcnxlbnwxfDB8fHwxNzkxODgxNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];
