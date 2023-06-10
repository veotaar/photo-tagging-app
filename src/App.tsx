import { FC, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import TaggableImage from './components/TaggableImage';
import { db } from './config/firebase';

const App: FC = () => {
  const locations = collection(db, 'locations');

  useEffect(() => {
    const getLocs = async () => {
      try {
        const data = await getDocs(locations);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData.at(0));
      } catch (err) {
        console.error(err);
      }
    };

    getLocs();
  }, []);

  return (
    <div>
      <TaggableImage
        imageSrc="waldo.png"
        alt="black bg with white letters"
        offset={10}
        hiddenObjectLocations={[{ name: 'A', location: [50, 60] }]}
      />
    </div>
  );
};

export default App;
