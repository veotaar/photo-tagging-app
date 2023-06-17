import { createContext, useContext, useReducer } from 'react';
import { hiddenObjects } from './data';

interface GameProviderProps {
  children?: React.ReactNode;
}

interface HiddenObject {
  name: string;
  isFound: boolean;
}

interface Action {
  type: string;
  payload: HiddenObject;
}

const GameContext = createContext<HiddenObject[] | null>(null);
const GameDispatchContext = createContext<React.Dispatch<Action> | null>(null);

function gameReducer(game: HiddenObject[], action: Action) {
  switch (action.type) {
    case 'found': {
      return game.map((hiddenObj) => {
        if (hiddenObj.name === action.payload.name) {
          return action.payload;
        }
        return hiddenObj;
      });
      break;
    }
    case 'reset': {
      return hiddenObjects;
    }
    default: {
      return game;
    }
  }
}

// const gameReducer = (game: HiddenObject[], action: Action) => {
//   switch (action.type) {
//     case 'found': {
//       return game.map((hiddenObj) => {
//         if (hiddenObj.name === action.payload.name) {
//           return action.payload;
//         }
//         return hiddenObj;
//       });
//       break;
//     }
//     case 'reset': {
//       return hiddenObjects;
//     }
//     default: {
//       return game;
//     }
//   }
// };

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, hiddenObjects);

  // prettier-ignore
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useGameData = () => {
  return useContext(GameContext);
};

export const useGameDispatch = () => {
  return useContext(GameDispatchContext);
};

export const useIsGameOver = () => {
  const gameObjects = useContext(GameContext);

  return gameObjects?.every((obj) => obj.isFound);
};

/* eslint-enable react-refresh/only-export-components */
