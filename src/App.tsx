import { FC, useEffect, useState } from 'react';
import { getDocs, collection, QuerySnapshot } from 'firebase/firestore';
import TaggableImage from './components/TaggableImage';
import { db } from './config/firebase';

interface HiddenObjects {
  A: { x: number; y: number };
  B: { x: number; y: number };
  C: { x: number; y: number };
}

const App: FC = () => {
  const locations = collection(db, 'locations');

  const [hiddenObjectLocations, setHiddenObjectLocations] = useState<HiddenObjects>();

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

  return (
    <div>
      <p className="mt-4 text-center text-3xl text-white">Find and tag the letters A, B and C 😀</p>

      <TaggableImage
        imageSrc="waldo.png"
        alt="black bg with white letters"
        hiddenObjectLocations={hiddenObjectLocations}
      />
    </div>
  );
};

export default App;
