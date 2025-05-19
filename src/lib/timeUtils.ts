
/**
 * Format minutes into a human-readable duration string
 * @param minutes - Time in minutes
 * @returns Formatted time string (e.g., "1h 30m")
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  } else {
    return `${mins}m ${Math.floor((minutes - mins) * 60)}s`;
  }
}

/**
 * Calculate elapsed time in minutes
 * @param startTime - Start timestamp in milliseconds
 * @param endTime - End timestamp in milliseconds (defaults to now)
 * @returns Elapsed time in minutes
 */
export function calculateElapsedTime(startTime: number, endTime: number = Date.now()): number {
  return (endTime - startTime) / (1000 * 60);
}
