import { FC, useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

interface LeaderboardEntry {
  user: string;
  time: number;
  recordId: string;
}

const Leaderboard: FC = () => {
  const leaderboardRef = collection(db, 'leaderboard');

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const q = query(leaderboardRef, orderBy('time', 'asc'), limit(100));
        const snapshot = await getDocs(q);
        const data: LeaderboardEntry[] = [];
        snapshot.forEach((doc) => {
          const { user, time, recordId } = doc.data();
          data.push({ user, time, recordId });
        });

        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      }
    };

    getLeaderboard();
  }, []);

  return (
    <div className="container mx-auto mt-10 max-w-2xl p-4 text-white">
      <h2 className="mb-4 text-center text-3xl font-bold">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2">Rank</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.recordId}>
              <td className="border px-4 py-2 text-right">{index + 1}</td>
              <td className="border px-4 py-2">{entry.user}</td>
              <td className="border px-4 py-2 text-center">{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
