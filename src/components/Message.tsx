import cn from 'classnames';
import { useIsGameOver } from '../contexts/GameProvider';

interface MessageProps {
  text: string;
  isSuccessful: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isSuccessful }) => {
  const isGameOver = useIsGameOver();

  return (
    <p
      className={cn(
        { 'text-emerald-400': isSuccessful || isGameOver, 'text-orange-500': !isSuccessful && !isGameOver },
        'mt-10 text-center text-2xl'
      )}
    >
      {isGameOver ? 'Congratulations!' : text}
    </p>
  );
};

export default Message;
