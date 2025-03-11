import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a locale string
 */
export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Get time ago from a date
 */
export function timeAgo(dateStr: string | Date | number | undefined): string {
  if (!dateStr) return 'há algum tempo';
  
  const date = new Date(dateStr);
  const now = new Date();
  
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Menos de um minuto
  if (seconds < 60) {
    return `há ${seconds} segundos`;
  }
  
  // Menos de uma hora
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `há ${minutes} minutos`;
  }
  
  // Menos de um dia
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `há ${hours} horas`;
  }
  
  // Menos de uma semana
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `há ${days} dias`;
  }
  
  // Menos de um mês
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `há ${weeks} semanas`;
  }
  
  // Menos de um ano
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `há ${months} meses`;
  }
  
  // Mais de um ano
  const years = Math.floor(days / 365);
  return `há ${years} anos`;
}