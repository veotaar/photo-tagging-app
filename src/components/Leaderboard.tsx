interface LeaderboardEntry {
  user: string;
  time: number;
  recordId: string;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
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
          {data.map((entry, index) => (
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
