import { FC } from 'react';

interface TargetSelectBoxProps {
  position: { x: number | undefined; y: number | undefined };
}

const TargetSelectBox: FC<TargetSelectBoxProps> = ({ position }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute" style={{ left: position.x, top: position.y }}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-dashed border-white bg-green-200/30 text-2xl text-white">
        +
      </div>
    </div>
  );
};

export default TargetSelectBox;
