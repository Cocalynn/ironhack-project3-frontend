// import * as React from 'react';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';

// export default function LabelBottomNavigation() {
//   const [value, setValue] = React.useState('recents');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <BottomNavigation sx={{ width: 100 }} value={value} onChange={handleChange}>
    //   <BottomNavigationAction
    //     label="Explore"
    //     value="Explore"
    //     icon={<ExploreIcon />}
    //   />
    //   <BottomNavigationAction
    //     label="Learn"
    //     value="Learn"
    //     icon={<SchoolIcon />}
    //   />
    //   <BottomNavigationAction
    //     label="Profile"
    //     value="Profile"
    //     icon={<FaceIcon />}
    //   />
    // </BottomNavigation>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
            <BottomNavigationAction
              label="Explore"
              value="Explore"
              icon={<ExploreIcon />}
            />
            <BottomNavigationAction
              label="Learn"
              value="Learn"
              icon={<SchoolIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              value="Profile"
              icon={<FaceIcon />}
            />

          </BottomNavigation>
      </Paper>
    </Box>
  );
}

