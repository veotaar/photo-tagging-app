import { FC, useEffect, useState } from 'react';
import { getDocs, collection, QuerySnapshot } from 'firebase/firestore';
// import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import TaggableImage from './components/TaggableImage';
import { db } from './config/firebase'; // TODO: add auth
import Message from './components/Message';
import GameProgress from './components/GameProgress';
import Leaderboard from './components/Leaderboard';

interface HiddenObjects {
  A: { x: number; y: number };
  B: { x: number; y: number };
  C: { x: number; y: number };
}

const App: FC = () => {
  const locations = collection(db, 'locations');

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const [hiddenObjectLocations, setHiddenObjectLocations] = useState<HiddenObjects>();
  const [messageText, setMessageText] = useState('Good luck!');
  const [messageSuccess, setMessageSuccess] = useState(true);

  // const signIn = async () => {
  //   await signInAnonymously(auth);
  // };

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // });

  // useEffect(() => {
  //   signIn();
  // }, []);

  useEffect(() => {
    const getLocs = async () => {
      try {
        const data = (await getDocs(locations)) as QuerySnapshot<HiddenObjects>;
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          // id: doc.id,
        }));
        setHiddenObjectLocations(filteredData.at(0));
      } catch (err) {
        console.error(err);
      }
    };

    getLocs();
  }, []);

  const updateMessage = (message: string, success: boolean) => {
    setMessageText(message);
    setMessageSuccess(success);
  };

  return (
    <div>
      <p className="mt-4 text-center text-3xl text-white">Find and tag the letters A, B and C 😀</p>
      <Message text={messageText} isSuccessful={messageSuccess} />
      <GameProgress />
      <TaggableImage
        imageSrc="waldo.png"
        alt="black bg with white letters"
        hiddenObjectLocations={hiddenObjectLocations}
        updateMessage={updateMessage}
      />
      <Leaderboard />
    </div>
  );
};

export default App;
