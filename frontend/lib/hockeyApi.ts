/**
 * Hockey API Utility
 * 
 * This module handles all requests to the hockey-live.sk API
 * Documentation: https://hockey-live.sk/
 */

const API_BASE_URL = 'https://hockey-live.sk/api';

/**
 * Fetch data from the hockey API
 * @param endpoint - The API endpoint to call
 * @returns The JSON response from the API
 */
export async function fetchHockeyData(endpoint: string) {
  const apiUrl = `${API_BASE_URL}${endpoint}`;

  try {
    console.log(`Fetching from: ${apiUrl}`);
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`API Response status: ${response.status} ${response.statusText}`);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Hockey data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching hockey data:', error);
    throw error;
  }
}

/**
 * Get current league standings
 */
export async function getLeagueStandings(leagueId: string = 'slovak-extraliga') {
  return fetchHockeyData(`/standings/${leagueId}`);
}

/**
 * Get today's games
 */
export async function getTodaysGames() {
  return fetchHockeyData('/games/today');
}

/**
 * Get team information
 */
export async function getTeamInfo(teamId: string) {
  return fetchHockeyData(`/teams/${teamId}`);
}

/**
 * Get player statistics
 */
export async function getPlayerStats(playerId: string) {
  return fetchHockeyData(`/players/${playerId}`);
}
