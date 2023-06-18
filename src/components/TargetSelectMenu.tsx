import { FC } from 'react';
import cn from 'classnames';
import { useGameDispatch } from '../contexts/GameProvider';

interface TargetSelectMenuProps {
  position: { x: number; y: number };
  isActive: boolean;
  onClick: () => void;
  updateMessage: (message: string, success: boolean) => void;
  clickedOn: { isFound: boolean; name: string };
  options?: string[];
}

interface HiddenObject {
  name: string;
  isFound: boolean;
}

interface Action {
  type: string;
  payload: HiddenObject;
}

const TargetSelectMenu: FC<TargetSelectMenuProps> = ({
  position = { x: 0, y: 0 },
  isActive,
  onClick,
  clickedOn,
  updateMessage,
  options = ['A', 'B', 'C'],
}) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useGameDispatch() as React.Dispatch<Action>;

  // TODO: dispatch changes
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const selectedObject = e.target.dataset.option;

    if (clickedOn.isFound && selectedObject === clickedOn.name) {
      updateMessage(`You found ${selectedObject}! Good job!`, true);
      dispatch({ type: 'found', payload: clickedOn });
    }
    if (clickedOn.isFound && selectedObject !== clickedOn.name) {
      updateMessage(`That's not ${selectedObject}! Try again!`, false);
    }
    if (!clickedOn.isFound) {
      updateMessage('There is nothing there! Try again!', false);
    }

    onClick();
  };

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
          <button
            type="button"
            className="rounded px-10 py-2 hover:bg-black hover:text-white"
            key={option}
            onClick={handleClick}
            data-option={option}
          >
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
