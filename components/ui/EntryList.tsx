import { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { UIContext } from '../../context/ui';

import style from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status == status), [ entries ]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id');
    const entry = entries.find(e => e._id == id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
    >
      <Paper 
        sx={{ 
          height: 'calc(100vh - 200px)',
          overflowY: 'auto',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}

        className={ isDragging ? style.dragging : '' }
      >

        <List
          sx={{
            opacity: isDragging ? 0.4 : 1,
            transition: 'all 200ms'
          }}
        >

          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id } entry={entry} />
            ))
          }

        </List>

      </Paper>
    </div>
  );
};