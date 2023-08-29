import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MainLayout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry
}

export default function EntryPage({ entry }: Props) {
  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    };

    updateEntry(updatedEntry);
  };

  const onDelete = () => {

    deleteEntry(entry);
    router.push('/');

  };

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  return (
    <MainLayout title='Entry'>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entry"
              subheader={dateFunctions.getFormatDistance(entry.createdAt)}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="Update entry"
                value={inputValue}
                onChange={onTextFieldChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
                onBlur={() => setTouched(true)}
              />

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={ onDelete }
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red'
        }}
      >
        <DeleteIcon />
      </IconButton>

    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      entry
    }
  };
};