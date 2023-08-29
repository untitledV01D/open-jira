import { UIState } from './';

type UIActionType =
  | { type: 'openSideBar' | 'closeSideBar' } 
  | { type: 'adding-entry', payload: boolean }
  | { type: 'start-dragging' }
  | { type: 'end-dragging' }

export const reducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'openSideBar':
      return {
        ...state,
        isSideMenuOpen: true
      };
    
    case 'closeSideBar':
      return {
        ...state,
        isSideMenuOpen: false
      };

    case 'adding-entry':
      return {
        ...state,
        isAddingEntry: action.payload
      };
    
    case 'start-dragging':
      return {
        ...state,
        isDragging: true
      };
    
    case 'end-dragging':
      return {
        ...state,
        isDragging: false
      };
    default:
      return state;
  }
};