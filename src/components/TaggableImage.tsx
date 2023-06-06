import { useRef, useState } from 'react';
import getPixelLocation from '../utils/getPixelLocation';

interface TaggableImageProps {
  imageSrc: string;
  alt: string;
  hiddenObjectLocations: { name: string; location: [number, number] }[];
  offset: number;
  children?: React.ReactNode;
}

const TaggableImage: React.FC<TaggableImageProps> = ({ imageSrc, alt, hiddenObjectLocations, offset }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [mouseLoc, setMouseLoc] = useState<{ x: number; y: number } | undefined>();

  const handleClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const xLoc = e.pageX;
    const yLoc = e.pageY;

    console.log('clicked on: ', xLoc, yLoc);
    console.log('hidden object 1', hiddenObjectLocations.at(0)?.location);
    console.log('offset', offset);

    console.log(typeof imgRef.current);
    console.log(imgRef.current);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLImageElement> = (e) => {
    if (typeof imgRef.current === null) return;

    const img = imgRef.current as HTMLImageElement;

    const { pixelX, pixelY } = getPixelLocation(img, e.pageX, e.pageY);

    setMouseLoc({
      x: pixelX,
      y: pixelY,
    });
  };

  return (
    <div className="relative mx-auto mt-10 aspect-video max-w-3xl">
      <div className="absolute bottom-2 right-2">
        <p className="text-green-500">
          x: {mouseLoc?.x} y: {mouseLoc?.y}
        </p>
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
