import cn from 'classnames';
import { useGameData } from '../contexts/GameProvider';

const GameProgress: React.FC = () => {
  const gameData = useGameData();

  return (
    <div className="mx-auto mt-2 flex w-64 gap-1 text-center">
      {gameData &&
        gameData.map((obj) => (
          <div
            key={obj.name}
            className={cn(
              {
                ' bg-emerald-400 text-emerald-900': obj.isFound,
                ' bg-zinc-800 text-zinc-500': !obj.isFound,
              },
              'w-full rounded px-4 py-2 text-lg font-bold'
            )}
          >
            {obj.name}
          </div>
        ))}
    </div>
  );
};

export default GameProgress;
