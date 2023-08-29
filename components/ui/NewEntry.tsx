import { ChangeEvent, useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onFieldTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if(inputValue.length <= 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  const onCancel = () => {
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingY: 2 }}>
      {
        isAddingEntry
          ? (
            <>
              <TextField
                fullWidth
                autoFocus
                multiline
                label="New Entry"
                sx={{ marginTop: 1, marginBottom: 2 }}
                placeholder="New entry"
                helperText={inputValue.length <= 0 && touched && 'Give a value'}
                value={ inputValue }
                error={ touched && inputValue.length <= 0 }
                onBlur={ () => setTouched(true) }
                onChange={ onFieldTextChange }
              />

              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  endIcon={<CancelOutlinedIcon />}
                  onClick={ onCancel }
                >
                  Cancel
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<SaveOutlinedIcon />}
                  onClick={ onSave }
                >
                  Save
                </Button>
              </Box>

            </>
          )
          : (
            <Button
              fullWidth
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={ () => setIsAddingEntry(true) }
            >
              Add task
            </Button>
          )
      }

    </Box>
  );
};