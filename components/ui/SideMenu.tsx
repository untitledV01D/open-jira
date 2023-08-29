import { useContext } from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor="left"
      open={ isSideMenuOpen }
      onClose={ closeSideMenu }
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }} >
          <Typography variant='h4'>
            Menu
          </Typography>

          <List>
            { 
              menuItems.map((text, index) => (
                <ListItemButton key={ index }>
                  <ListItemIcon>
                    { index % 2 ? <AcUnitOutlinedIcon />: <BlurOnOutlinedIcon /> }
                  </ListItemIcon>
                  <ListItemText>
                    { text }
                  </ListItemText>
                </ListItemButton>
              ))
            }
          </List>

          <Divider />
        </Box>
      </Box>
    </Drawer>
  );
};