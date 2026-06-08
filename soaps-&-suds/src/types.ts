export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  basePrice: number; // Price per unit/kg/bag
  unit: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface Bubble {
  id: number;
  x: number; // Percentage content side-to-side (0 to 100)
  size: number; // Pixels
  duration: number; // Seconds
  delay: number; // Seconds
  color: string;
}
