import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Container,
  Typography,
  CardMedia,
} from "@material-ui/core";
import addChapterImage from "../assets/images/new-chapter-img.jpeg";
import appConfig from "../config/app-config.json";
import FootBar from "../components/FootBar";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  input: {
    color: "#ffffff",
  },
  label: {
    color: "#ffffff",
    "&.Mui-focused": {
      color: "#ffffff",
    },
  },
}));

const AddChapterForm = () => {

  const classes = useStyles();
  const session = JSON.parse(localStorage.getItem('session'));


  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };
  const { courseId } = useParams();
  const [chapterData, setChapterData] = useState({
    name: "",
    description: "",
    youtubeId: "",
  });

  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${appConfig.apiUri}/api/courses/${courseId}/chapters`,
        chapterData,
        config
      );
      setChapterData({
        name: "",
        description: "",
        youtubeId: "",
      });
    } catch (error) {
      console.error("Failed to add chapter", error);
    }
  };

  return (
    <>
      <CardMedia
        component={Box}
        height="250"
        image={addChapterImage}
        alt="header"
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" align="center">
          Add Chapter
        </Typography>
      </CardMedia>

      <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            label="Chapter Name"
            name="name"
            value={chapterData.name}
            onChange={handleChange}
            required
          />
          <TextField
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            label="Description"
            name="description"
            multiline
            minRows={4}
            value={chapterData.description}
            onChange={handleChange}
            required
          />
          <TextField
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            label="YouTube Video ID"
            name="youtubeId"
            value={chapterData.youtubeId}
            onChange={handleChange}
            required
            placeholder="Enter the ID of the YouTube video (e.g., dQw4w9WgXcQ)"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Add Chapter
          </Button>
        </form>
      </Container>

      <Box sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            '@media (min-width: 600px)': {
              width: '600px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}}>
        <FootBar />
      </Box>
    </>
  );
};

export default AddChapterForm;
