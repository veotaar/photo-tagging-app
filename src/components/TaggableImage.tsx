import { useRef, useState } from 'react';
import getPixelLocation from '../utils/getPixelLocation';
import TargetSelectBox from './TargetSelectBox';
import { foundItem } from '../utils/foundItem';

type HiddenObjects = { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } };

type Location = { x: number; y: number };
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

  const handleClick: React.MouseEventHandler<HTMLImageElement> = () => {
    const report = foundItem(hiddenObjectLocations as HiddenObjects, mouseLoc as Location, 45);

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
    <div className="relative mx-auto mt-10 aspect-video max-w-3xl cursor-none overflow-hidden">
      <TargetSelectBox position={{ x: mouseLocClient?.x, y: mouseLocClient?.y }} />
      <div className="pointer-events-none absolute bottom-1 right-2">
        <p className="text-green-500">{mouseLoc && `x: ${mouseLoc.x} y: ${mouseLoc.y}`}</p>
      </div>
      <img
        src={imageSrc}
        alt={alt}
        ref={imgRef}
        className="object-fill"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default TaggableImage;
