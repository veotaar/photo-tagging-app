import { useRef, useState } from 'react';
import cn from 'classnames';
import getPixelLocation from '../utils/getPixelLocation';
import TargetSelectBox from './TargetSelectBox';
import { foundItem } from '../utils/foundItem';
import { useGameDispatch } from '../contexts/GameProvider';
import TargetSelectMenu from './TargetSelectMenu';

type HiddenObjects = { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } };

type Location = { x: number; y: number };

interface HiddenObject {
  name: string;
  isFound: boolean;
}

interface Action {
  type: string;
  payload: HiddenObject;
}

interface TaggableImageProps {
  imageSrc: string;
  alt: string;
  hiddenObjectLocations: HiddenObjects | undefined;
  children?: React.ReactNode;
}

const TaggableImage: React.FC<TaggableImageProps> = ({ imageSrc, alt, hiddenObjectLocations }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [mouseLoc, setMouseLoc] = useState<{ x: number; y: number } | undefined>();
  const [mouseLocClient, setMouseLocClient] = useState<{ x: number; y: number } | undefined>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [clickedLocation, setClickedLocation] = useState({ x: 0, y: 0 });
  // const [startTime, setStartTime] = useState(0);
  // const [endTime, setEndTime] = useState(0);

  const dispatch = useGameDispatch() as React.Dispatch<Action>;

  const handleClick: React.MouseEventHandler<HTMLImageElement> = () => {
    const report = foundItem(hiddenObjectLocations as HiddenObjects, mouseLoc as Location, 50);
    setClickedLocation(mouseLocClient as Location);
    if (report.isFound) dispatch({ type: 'found', payload: report });

    console.log(report);
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
    <div className="relative mx-auto mt-10 aspect-video max-w-3xl overflow-hidden border">
      <div className={cn({ hidden: isGameRunning }, 'flex h-full w-full items-center justify-center')}>
        <button
          type="button"
          className="rounded border px-4 py-2 text-white hover:bg-white hover:text-black"
          onClick={() => setIsGameRunning(true)}
        >
          Start Game
        </button>
      </div>
      <TargetSelectMenu isActive position={clickedLocation} />
      <TargetSelectBox position={{ x: mouseLocClient?.x, y: mouseLocClient?.y }} isActive={isGameRunning} />
      <div className={cn({ hidden: !isGameRunning }, 'pointer-events-none absolute bottom-1 right-2 z-20')}>
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
    </div>
  );
};

export default TaggableImage;
