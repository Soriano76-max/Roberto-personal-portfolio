'use client';

import { useState, useEffect } from 'react';
import { getTodaysGames, getLeagueStandings } from '@/lib/hockeyApi';
import {
  getStatusLabel,
  isGameLive,
  isGameFinal,
  getStatusColor,
  getStatusBadgeColor,
  getClinchedStatus,
} from '@/lib/hockeyConstants';

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  time: string;
  status: string;
  po_type?: string;
}

interface Standing {
  team: string;
  wins: number;
  losses: number;
  points: number;
  group?: string;
  clinch?: string;
}

export default function HockeyStats() {
  const [games, setGames] = useState<Game[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'games' | 'standings'>('games');

  useEffect(() => {
    const loadHockeyData = async () => {
      try {
        setLoading(true);
        
        // Fetch today's games
        const gamesData = await getTodaysGames();
        setGames(gamesData || []);

        // Fetch league standings
        const standingsData = await getLeagueStandings();
        setStandings(standingsData || []);
      } catch (err) {
        console.error('Error loading hockey data:', err);
        setError('Failed to load hockey data. Please check the API connection.');
      } finally {
        setLoading(false);
      }
    };

    loadHockeyData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading hockey stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <a 
          href="https://hockey-live.sk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
        >
          Visit Hockey Live →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('games')}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === 'games'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Today's Games
        </button>
        <button
          onClick={() => setActiveTab('standings')}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === 'standings'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Standings
        </button>
      </div>

      {activeTab === 'games' && (
        <div className="space-y-3">
          {games.length > 0 ? (
            games.map((game) => {
              const statusLabel = getStatusLabel(game.status);
              const isLive = isGameLive(game.status);
              const isFinal = isGameFinal(game.status);
              
              return (
                <div
                  key={game.id}
                  className={`p-4 border rounded-lg transition-all ${
                    isLive
                      ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10 hover:shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {game.homeTeam} vs {game.awayTeam}
                        </p>
                        {game.po_type && game.po_type !== 'NULL' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                            {game.po_type}
                          </span>
                        )}
                        {isLive && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-orange-600 text-white animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {game.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {game.score}
                      </p>
                      <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeColor(game.status)} ${getStatusColor(game.status)}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No games scheduled for today
            </p>
          )}
        </div>
      )}

      {activeTab === 'standings' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Team
                </th>
                {/* Show Group column if available */}
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  W
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  L
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Pts
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.length > 0 ? (
                standings.map((standing) => {
                  const clinchStatus = getClinchedStatus(standing.clinch || null);
                  
                  return (
                    <tr
                      key={standing.team}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                        <div className="flex items-center gap-2">
                          <span>{standing.team}</span>
                          {standing.group && (
                            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                              {standing.group}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                        {standing.wins}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                        {standing.losses}
                      </td>
                      <td className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        {standing.points}
                      </td>
                      <td className="text-center py-3 px-4">
                        {clinchStatus ? (
                          <span className="text-xs font-semibold">
                            {clinchStatus.includes('✓') && (
                              <span className="text-green-600 dark:text-green-400">{clinchStatus}</span>
                            )}
                            {clinchStatus.includes('✗') && (
                              <span className="text-red-600 dark:text-red-400">{clinchStatus}</span>
                            )}
                            {clinchStatus.includes('↓') && (
                              <span className="text-orange-600 dark:text-orange-400">{clinchStatus}</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-600 dark:text-gray-400">
                    No standings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://hockey-live.sk/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          View on Hockey Live →
        </a>
      </div>
    </div>
  );
}
