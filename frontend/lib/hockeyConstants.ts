/**
 * Hockey API Constants and Helpers
 * 
 * Converts API response codes into user-friendly labels
 * Based on hockey-live.sk API documentation
 */

// Playoff type codes
export const PLAYOFF_TYPES: Record<string, string> = {
  'NULL': 'Regular Season',
  'Q': 'Qualification',
  'QF': 'Quarterfinals',
  'SF': 'Semifinals',
  'B': 'Bronze Medal',
  'F': 'Finals',
};

// Game status codes
export const GAME_STATUSES: Record<string, string> = {
  'final result': 'Final',
  'scheduled': 'Scheduled',
  'get ready': 'Getting Ready',
  'in the 1st period': 'In 1st Period',
  'after 1st period': 'After 1st Period',
  'in the 2nd period': 'In 2nd Period',
  'after 2nd period': 'After 2nd Period',
  'in the 3rd period': 'In 3rd Period',
  'after 3rd period': 'After 3rd Period',
  'overtime': 'Overtime',
  'after overtime': 'After Overtime',
};

// Goal type codes
export const GOAL_TYPES: Record<string, string> = {
  'normal': 'Goal',
  'PP1': 'PP (5v4)',
  'PP2': 'PP (5v3)',
  'SH1': 'SH (4v5)',
  'SH2': 'SH (3v5)',
  'PS': 'Penalty Shot',
};

// Player position codes
export const PLAYER_POSITIONS: Record<string, string> = {
  'GK': 'Goalkeeper',
  'F': 'Forward',
  'D': 'Defense',
  'RW': 'Right Wing',
  'LW': 'Left Wing',
  'CE': 'Center',
  'RD': 'Right Defense',
  'LD': 'Left Defense',
};

/**
 * Get user-friendly playoff type label
 */
export function getPlayoffLabel(poType: string | null): string {
  if (!poType) return 'Regular Season';
  return PLAYOFF_TYPES[poType] || poType;
}

/**
 * Get user-friendly game status label
 */
export function getStatusLabel(status: string): string {
  return GAME_STATUSES[status] || status;
}

/**
 * Check if game is live
 */
export function isGameLive(status: string): boolean {
  return status.includes('in the') || status === 'overtime';
}

/**
 * Check if game is final
 */
export function isGameFinal(status: string): boolean {
  return status === 'final result' || status === 'after overtime';
}

/**
 * Get goal type label
 */
export function getGoalTypeLabel(when: string | null): string {
  if (!when) return 'Goal';
  return GOAL_TYPES[when] || when;
}

/**
 * Get player position label
 */
export function getPositionLabel(pos: string): string {
  return PLAYER_POSITIONS[pos] || pos;
}

/**
 * Determine status color for UI
 */
export function getStatusColor(status: string): string {
  if (isGameLive(status)) return 'text-orange-600 dark:text-orange-400';
  if (isGameFinal(status)) return 'text-gray-600 dark:text-gray-400';
  return 'text-blue-600 dark:text-blue-400';
}

/**
 * Determine status badge background
 */
export function getStatusBadgeColor(status: string): string {
  if (isGameLive(status)) return 'bg-orange-100 dark:bg-orange-900/30';
  if (isGameFinal(status)) return 'bg-gray-100 dark:bg-gray-800';
  return 'bg-blue-100 dark:bg-blue-900/30';
}

/**
 * Parse clinch message (usually in Slovak)
 */
export function getClinchedStatus(clinch: string | null): string | null {
  if (!clinch) return null;
  
  const clinchMap: Record<string, string> = {
    'tím už má zaistenú účasť vo štvrťfinále': '✓ Clinched QF',
    'tím sa už nedostane do štvrťfinále': '✗ Eliminated',
    'tím zostupuje do I.DIV': '↓ Relegated',
  };
  
  return clinchMap[clinch] || clinch;
}
