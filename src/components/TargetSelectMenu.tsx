import { FC } from 'react';
import cn from 'classnames';

interface TargetSelectMenuProps {
  position: { x: number; y: number };
  isActive: boolean;
  options?: string[];
}

const TargetSelectMenu: FC<TargetSelectMenuProps> = ({
  position = { x: 0, y: 0 },
  isActive,
  options = ['A', 'B', 'C'],
}) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        { hidden: !isActive },
        'absolute z-50 flex flex-col rounded border border-white bg-white text-black'
      )}
      style={{ left: position.x + 40, top: position.y + 40 }}
    >
      {options.map((option) => {
        return (
          <button type="button" className="rounded px-10 py-2 hover:bg-black hover:text-white" key={option}>
            {option}
          </button>
        );
      })}
    </div>
  );
};

TargetSelectMenu.defaultProps = {
  options: ['A', 'B', 'C'],
};

export default TargetSelectMenu;
