import { FC } from 'react';
import TaggableImage from './components/TaggableImage';

const App: FC = () => {
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
