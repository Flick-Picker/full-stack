import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  InputLabel,
  OutlinedInput,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";

import React from "react";
import Header from "../components/Header";
import FriendsList from "../components/FriendsList";
import GroupsList from "../components/GroupsList";
import { Check, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  // React-Router Navigation
  const navigate = useNavigate();

  const handleJoinGroupClick = (e) => {
    e.preventDefault();
    navigate("/group/join");
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    navigate("/group/create");
  };

  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="5vh"
        minHeight="75vh"
      >
        {/* TODO: Every button needs a handler */}
        <Typography variant="h4" component="h4">
          Preferences
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="0%"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h6" component="h6">
              Genres
            </Typography>

            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >


            <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">Liked</InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 3"/>
            </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">Disliked</InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 3"/>
            </MenuItem>
        </Select>
      </FormControl>


          </Box>

          </Box>






          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h6" component="h6">
              Type
            </Typography>

            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >


            <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">Anime</InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 3"/>
            </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">Movies</InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 3"/>
            </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">TV Series</InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Genre 3"/>
            </MenuItem>
        </Select>
      </FormControl>



          </Box>

          </Box>


          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h6" component="h6">
              Rating
            </Typography>

            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >


            <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
        <Select>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Range 1"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Range 2"/>
            </MenuItem>
            <MenuItem>
              <Checkbox/>
              <ListItemText primary = "Range 3"/>
            </MenuItem>
        </Select>
      </FormControl>






          </Box>

          </Box>
          
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="2%"
        >

          <Button variant="outlined" size="large">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Preferences;
