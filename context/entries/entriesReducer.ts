import { EntriesState } from './';
import { Entry } from '../../interfaces';

type EntriesActionType = 
  | { type: 'add-entry', payload: Entry }
  | { type: 'update-entry', payload: Entry }
  | { type: 'delete-entry', payload: Entry }
  | { type: 'refresh-entries', payload: Entry[] };

export const reducer = (state: EntriesState, action: EntriesActionType) => {
  switch(action.type){
    case 'add-entry':
      return {
        ...state,
        entries: [ ...state.entries, action.payload ]
      };
    case 'update-entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if(entry._id == action.payload._id){
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        })
      };
    case 'refresh-entries':
      return {
        ...state,
        entries: [ ...action.payload ]
      };
    case 'delete-entry':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id != action.payload._id )
      };
  }
};