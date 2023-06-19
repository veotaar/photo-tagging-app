import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import getPixelLocation from '../utils/getPixelLocation';
import TargetSelectBox from './TargetSelectBox';
import { foundItem } from '../utils/foundItem';
import TargetSelectMenu from './TargetSelectMenu';
import { getTimeStamp } from '../utils/getTimeStamp';
import { useIsGameOver } from '../contexts/GameProvider';
import ResultScreen from './ResultScreen';

type HiddenObjects = { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } };

type Location = { x: number; y: number };

interface TaggableImageProps {
  imageSrc: string;
  alt: string;
  hiddenObjectLocations: HiddenObjects | undefined;
  updateMessage: (message: string, success: boolean) => void;
  children?: React.ReactNode;
}

const TaggableImage: React.FC<TaggableImageProps> = ({ imageSrc, alt, hiddenObjectLocations, updateMessage }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [mouseLoc, setMouseLoc] = useState<{ x: number; y: number } | undefined>();
  const [mouseLocClient, setMouseLocClient] = useState<{ x: number; y: number } | undefined>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickedLocation, setClickedLocation] = useState({ x: 0, y: 0 });
  const [clickedObject, setClickedObject] = useState({ isFound: false, name: '' });
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const isGameOver = useIsGameOver();

  const endGame = () => {
    setIsGameRunning(false);
    setIsGameEnded(true);
  };

  useEffect(() => {
    if (isGameOver) {
      endGame();
    }
  }, [isGameOver]);

  const onOptionSelect = () => {
    setIsMenuOpen(!isMenuOpen);
    setEndTime(getTimeStamp());
  };

  const startGame = () => {
    setIsGameRunning(true);
    setIsGameEnded(false);
    setStartTime(getTimeStamp());
  };

  const showInitialPage = () => {
    setIsGameRunning(false);
    setIsGameEnded(false);
  };

  const handleClick: React.MouseEventHandler<HTMLImageElement> = () => {
    const report = foundItem(hiddenObjectLocations as HiddenObjects, mouseLoc as Location, 50);
    setClickedObject(report);
    setClickedLocation(mouseLocClient as Location);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const img = imgRef.current as HTMLImageElement;

    const { pixelX, pixelY, cursorX, cursorY } = getPixelLocation(img, e.pageX, e.pageY);

    setMouseLoc({
      x: pixelX,
      y: pixelY,
    });

    setMouseLocClient({
      x: cursorX - 40,
      y: cursorY - 40,
    });
  };

  return (
    <div className="relative mx-auto mt-2 aspect-video max-w-3xl overflow-hidden border">
      <div className={cn({ hidden: isGameRunning || isGameEnded }, 'flex h-full w-full items-center justify-center')}>
        <button
          type="button"
          className="rounded border px-4 py-2 text-white hover:bg-white hover:text-black"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
      <TargetSelectMenu
        isActive={isMenuOpen}
        position={clickedLocation}
        onClick={onOptionSelect}
        clickedOn={clickedObject}
        updateMessage={updateMessage}
      />
      <TargetSelectBox
        position={{ x: mouseLocClient?.x, y: mouseLocClient?.y }}
        isActive={isGameRunning && !isMenuOpen && !isGameEnded}
      />
      <div
        className={cn({ hidden: !isGameRunning || isGameEnded }, 'pointer-events-none absolute bottom-1 right-2 z-20')}
      >
        <p className="text-green-500">{mouseLoc && `x: ${mouseLoc.x} y: ${mouseLoc.y}`}</p>
      </div>
      <img
        src={imageSrc}
        alt={alt}
        ref={imgRef}
        className={cn({ hidden: !isGameRunning }, 'object-fill')}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />

      <ResultScreen
        duration={endTime - startTime}
        isVisible={isGameEnded && !isGameRunning}
        restart={startGame}
        updateMessage={updateMessage}
        showInitialPage={showInitialPage}
      />
    </div>
  );
};

export default TaggableImage;
