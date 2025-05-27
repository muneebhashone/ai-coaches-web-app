import type { SessionTemplateSchemaType } from "@/services/sessions/session.schema";

export interface SessionGenerationOptions {
  startDate: Date;
  count: number;
  interval: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  template: SessionTemplateSchemaType;
}

export function generateSessions(options: SessionGenerationOptions) {
  const { startDate, count, interval, template } = options;
  const sessions = [];

  for (let i = 0; i < count; i++) {
    const sessionDate = new Date(startDate);
    
    switch (interval) {
      case 'daily':
        sessionDate.setDate(startDate.getDate() + i);
        break;
      case 'weekly':
        sessionDate.setDate(startDate.getDate() + (i * 7));
        break;
      case 'biweekly':
        sessionDate.setDate(startDate.getDate() + (i * 14));
        break;
      case 'monthly':
        sessionDate.setMonth(startDate.getMonth() + i);
        break;
    }

    const sessionName = template.namePattern.includes('{number}') 
      ? template.namePattern.replace('{number}', (i + 1).toString())
      : `${template.namePattern} ${i + 1}`;

    sessions.push({
      sessionDate: convertISOToDatetimeLocal(sessionDate.toISOString()), // Format for datetime-local input
      name: sessionName,
      duration: template.duration,
      status: template.status,
      active: template.active,
    });
  }

  return sessions;
}

export function formatSessionDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function validateSessionDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date >= now;
}

// Helper function to convert datetime-local to ISO
export function convertDatetimeLocalToISO(datetimeLocal: string): string {
  if (!datetimeLocal) return '';
  
  // datetime-local format: "2024-01-20T14:00"
  // Convert to ISO: "2024-01-20T14:00:00.000Z"
  try {
    const date = new Date(datetimeLocal);
    if (Number.isNaN(date.getTime())) {
      console.warn('Invalid datetime-local format:', datetimeLocal);
      return '';
    }
    return date.toISOString();
  } catch (error) {
    console.error('Error converting datetime-local to ISO:', error);
    return '';
  }
}

// Helper function to convert ISO to datetime-local for form inputs
export function convertISOToDatetimeLocal(isoString: string): string {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      console.warn('Invalid ISO format:', isoString);
      return '';
    }
    
    // Convert to local timezone and format for datetime-local input
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().slice(0, 16);
  } catch (error) {
    console.error('Error converting ISO to datetime-local:', error);
    return '';
  }
}

export const quickGenerationPresets = [
  { label: '4 Weekly Sessions', count: 4, interval: 'weekly' as const },
  { label: '8 Weekly Sessions', count: 8, interval: 'weekly' as const },
  { label: '5 Daily Sessions', count: 5, interval: 'daily' as const },
  { label: '6 Biweekly Sessions', count: 6, interval: 'biweekly' as const },
  { label: '3 Monthly Sessions', count: 3, interval: 'monthly' as const },
]; 