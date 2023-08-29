
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { MainLayout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

export default function Home() {
  return (
    <MainLayout title="Home - OpenJira">
      <Grid
        container
        spacing={2}
      >

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="pendings" />

            <CardContent>
              
              <NewEntry />
              <EntryList status='pending' />

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="in process" />

            <CardContent>
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="completed" />

            <CardContent>
              <EntryList status='finished' />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </MainLayout>
  );
}
