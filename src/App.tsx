import { FC, useEffect, useState } from 'react';
import { getDocs, collection, QuerySnapshot, query, orderBy, limit } from 'firebase/firestore';
import TaggableImage from './components/TaggableImage';
import { db, signIn } from './config/firebase';
import Message from './components/Message';
import GameProgress from './components/GameProgress';
import Leaderboard from './components/Leaderboard';
import Loading from './components/Loading';

interface HiddenObjects {
  A: { x: number; y: number };
  B: { x: number; y: number };
  C: { x: number; y: number };
}

interface LeaderboardEntry {
  user: string;
  time: number;
  recordId: string;
}

const App: FC = () => {
  const locations = collection(db, 'locations');
  const leaderboardRef = collection(db, 'leaderboard');
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenObjectLocations, setHiddenObjectLocations] = useState<HiddenObjects>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [messageText, setMessageText] = useState(`Click and tag "A", "B" and "C"!`);
  const [messageSuccess, setMessageSuccess] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const getData = async () => {
      try {
        await signIn();
        const locData = (await getDocs(locations)) as QuerySnapshot<HiddenObjects>;
        const filteredData = locData.docs.map((doc) => ({
          ...doc.data(),
          // id: doc.id,
        }));
        setHiddenObjectLocations(filteredData.at(0));
        const q = query(leaderboardRef, orderBy('time', 'asc'), limit(100));
        const snapshot = await getDocs(q);
        const lbData: LeaderboardEntry[] = [];
        snapshot.forEach((doc) => {
          const { user, time, recordId } = doc.data();
          lbData.push({ user, time, recordId });
        });
        setLeaderboard(lbData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        console.log('oops');
      }
    };

    getData();
  }, []);

  const updateMessage = (message: string, success: boolean) => {
    setMessageText(message);
    setMessageSuccess(success);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <p className="mt-4 text-center text-3xl font-bold text-zinc-50">{`Where's Letters?`}</p>
      <Message text={messageText} isSuccessful={messageSuccess} />
      <GameProgress />
      <TaggableImage
        imageSrc="waldo.webp"
        alt="black bg with white letters"
        hiddenObjectLocations={hiddenObjectLocations}
        updateMessage={updateMessage}
      />
      <Leaderboard data={leaderboard} />
    </div>
  );
};

export default App;
