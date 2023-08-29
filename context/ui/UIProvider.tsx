import { ReactNode, FC, useReducer } from 'react';
import { UIContext, reducer } from './';

interface Props {
  children: ReactNode
}

export interface UIState {
  isSideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isSideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvier: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({
      type: 'openSideBar'
    });
  };

  const closeSideMenu = () => {
    dispatch({
      type: 'closeSideBar'
    });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({
      type: 'adding-entry',
      payload: isAdding
    });
  };

  const startDragging = () => {
    dispatch({
      type: 'start-dragging',
    });
  };

  const endDragging = () => {
    dispatch({
      type: 'end-dragging',
    });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,

        startDragging,
        endDragging
      }}
    >
      { children }
    </UIContext.Provider>
  );
};

