import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='relative'>
      <Toolbar>
        <IconButton
          edge='start'
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>

          <NextLink href="/" passHref legacyBehavior>
            <Link underline="none" color="white">
              <Typography>OpenJira</Typography>
            </Link>
          </NextLink>
      </Toolbar>
    </AppBar>
  );
};
