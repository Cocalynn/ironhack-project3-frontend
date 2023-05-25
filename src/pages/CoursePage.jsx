import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import CourseProgress from "../components/CourseProgress";
import Reviews from "../components/Reviews";
import defaultProfileImg from "../assets/images/default-profile-img.png";
import defaultCourseImg from "../assets/images/course-default-image.webp";
import { useParams, Link as RouterLink } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReplayCircleFilledRoundedIcon from "@mui/icons-material/ReplayCircleFilledRounded";
import CircularProgress from "@mui/material/CircularProgress";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import EditIcon from "@material-ui/icons/Edit";
import appConfig from "../config/app-config.json";
import { useSelector } from "react-redux";

const CoursePage = () => {
  const session = useSelector((state) => state.session);

  const config = {
    headers: {
      Authorization: `Bearer ${session.credentials.accessToken}`,
    },
  };

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [watchedChapters, setWatchedChapters] = useState({});

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const { courseId } = useParams();

  const fetchYoutubeThumbnail = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const getCourse = () => {
    setLoading(true);
    axios
      .get(`${appConfig.apiUri}/api/courses/${courseId}`, config)
      .then(async (response) => {
        const oneCourse = response.data;

        if (oneCourse.chapters.length > 0 && oneCourse.chapters[0].youtubeId) {
          oneCourse.thumbnail = await fetchYoutubeThumbnail(
            oneCourse.chapters[0].youtubeId
          );
        }

        setCourse(oneCourse);

        axios
          .get(`${appConfig.apiUri}/user`, config)
          .then((response) => {
            const userData = response.data;
            console.log("user is coursepage", userData);
            setUser(userData);
            fetchWishlist();
          })
          .catch((error) => console.log(error));

        axios
          .get(
            `${appConfig.apiUri}/api/lecturers/${oneCourse.lecturer}`,
            config
          )
          .then((lecturerResponse) => {
            const lecturerData = lecturerResponse.data;
            setLecturer(lecturerData);
          })
          .catch((error) => console.log(error));

        axios
          .get(`${appConfig.apiUri}/api/reviews/courses/${courseId}`, config)
          .then((reviewResponse) => {
            const reviewData = reviewResponse.data;
            setReviews(reviewData);
            if (reviewData.length > 0) {
              const sum = reviewData.reduce(
                (total, review) => total + review.rating,
                0
              );
              const average = sum / reviewData.length;
              setAverageRating(average);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };

  useEffect(() => {
    getCourse();
    fetchWatchedChapters(courseId);
  }, []);

  console.log("Do i have this course in the wishlist?: ", isInWishlist);

  const fetchWatchedChapters = (courseId) => {
    axios
      .get(`${appConfig.apiUri}/user`, config)
      .then((response) => {
        const watchedMap = {};
        const userData = response.data;
        console.log("this is the userData_ ", userData);
        console.log("this is the courseId_ ", courseId);
        const course = userData.courses.find(
          (c) => c.course.toString() === courseId
        );
        if (course) {
          course.chapters.forEach((chapter) => {
            watchedMap[chapter.chapter.toString()] = chapter.watched;
          });
          setWatchedChapters(watchedMap);
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchWishlist = () => {
    axios
      .get(`${appConfig.apiUri}/user/wishlist-courses`, config)
      .then((response) => {
        const wishlist = response.data;
        console.log("what's inside wishlist?: ", wishlist);
        if (wishlist.includes(courseId)) {
          setIsInWishlist(true);
        } else {
          setIsInWishlist(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  const addToWishlist = () => {
    axios
      .post(`${appConfig.apiUri}/user/wishlist`, { courseId }, config)
      .then((response) => {
        console.log(response.data);
        fetchWishlist();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromWishlist = () => {
    axios
      .delete(`${appConfig.apiUri}/user/wishlist`, {
        data: { courseId },
        ...config,
      })
      .then((response) => {
        console.log(response.data);
        fetchWishlist();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("chapters watched:", watchedChapters);
  console.log("current course: ", course);

  // Checkout
  const checkout = () => {
    axios
      .post(
        `${appConfig.apiUri}/api/checkout`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${session.credentials.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data.url;
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {course && (
        <>
          <Grid item xs={12} lg={8}>
            <Card style={{ margin: "20px" }}>
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <CardMedia
                  component="img"
                  alt="Course image"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  image={course.thumbnail || defaultCourseImg}
                />
              </div>
              <CardContent>
                <Typography variant="h5" component="div">
                  {course.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {averageRating
                    ? `Average Rating: ${averageRating.toFixed(
                        1
                      )} / Total ratings: ${reviews.length}`
                    : "No ratings available yet"}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {course.description}
                </Typography>
                <Badge
                  badgeContent={course.price}
                  color="primary"
                  style={{ marginLeft: "20px" }}
                />
              </CardContent>
              <CardActions>
                <Button
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/courses"
                >
                  <ArrowCircleLeftRoundedIcon /> Courses
                </Button>
                <Button
                  variant="contained"
                  color={isInWishlist ? "primary" : "secondary"}
                  startIcon={<FavoriteIcon />}
                  onClick={handleWishlist}
                >
                  {isInWishlist ? "Remove" : "Add"}
                </Button>
                <Button variant="contained" color="primary" onClick={checkout}>
                  <AddShoppingCartRoundedIcon /> Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            {lecturer && (
              <Card style={{ margin: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Profile Image"
                      src={defaultProfileImg || lecturer.profileImage}
                    />
                  }
                  action={
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  }
                  title={lecturer.name}
                />
                <CardContent>
                  <hr />
                  <Grid item xs={6}>
                    <Button
                      style={{ marginBottom: "5px" }}
                      variant="contained"
                      component={RouterLink}
                      to={`/add-chapter/${courseId}`}
                    >
                      Add Chapter
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={toggleReviewForm}
                    >
                      Leave a Review
                    </Button>
                  </Grid>

                  <Typography variant="body2"> </Typography>
                </CardContent>
                {showReviewForm && (
                  <CardContent>
                    <ReviewForm
                      courseId={courseId}
                      toggleReviewForm={toggleReviewForm}
                    />
                  </CardContent>
                )}
              </Card>
            )}
            <Reviews user={user} reviews={reviews} />
            <CourseProgress
              totalChapters={course.chapters.length}
              watchedChapters={watchedChapters}
            />
          </Grid>
          <Grid container spacing={2}>
            {course.chapters.map((chapter, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginRight: "20px",
                    marginLeft: "40px",
                    marginBottom: "20px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Chapter {index + 1}: {chapter.name}
                    </Typography>
                    <hr />
                    <CardActions>
                      <Grid container justify="center">
                        {watchedChapters[chapter._id] ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            component={RouterLink}
                            to={`/courses/${courseId}/chapters/${chapter._id}`}
                          >
                            <ReplayCircleFilledRoundedIcon /> Re-Watch Chapter
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to={`/courses/${courseId}/chapters/${chapter._id}`}
                          >
                            <PlayCircleIcon /> Play Chapter
                          </Button>
                        )}
                      </Grid>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CoursePage;
