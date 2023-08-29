import { ReactNode, FC, useReducer, useEffect } from 'react';

import { EntriesContext, reducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

interface Props {
  children: ReactNode;
}

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvier: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = async (description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description });

    dispatch({
      type: 'add-entry',
      payload: data
    });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });

      dispatch({
        type: 'update-entry',
        payload: data
      });
    } catch (error) {
      console.log({ message: 'Something was wrong' });
    }

  };

  const deleteEntry = async (entry :Entry) => {
    try {
      await entriesApi.delete<null>(`/entries/${entry._id}`);

      dispatch({
        type: 'delete-entry',
        payload: entry
      });
    } catch (error) {
      console.log({ message: 'Something was wrong' });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({
      type: 'refresh-entries',
      payload: data
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};