import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `#${timestamp}${random}`.slice(0, 10);
}

export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    'todos': 'Todos',
    'vitaminas': 'Vitaminas',
    'suplementos': 'Suplementos',
    'hierbas': 'Hierbas',
    'aceites': 'Aceites',
    'proteinas': 'Proteínas'
  };
  return categories[category] || category;
}
