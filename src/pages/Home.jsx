import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import cognitoUtils from '../lib/cognitoUtils'
import request from 'request'
import appConfig from '../config/app-config.json'
import GuestHomePage from "./GuestHomePage";
import RegisteredCourseCard from '../components/RegisteredCourseCard';
import WishlistCourseCard from '../components/WishlistCourseCard';
import { Typography, Avatar, Button, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FootBar from '../components/FootBar';

const mapStateToProps = state => {
  return { session: state.session }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      apiStatus: 'Not called', 
      file: null, 
      userProfilePic: null, 
      nickname: null, 
      newNickName:"",
      openDialog: false,
      registeredCourses: [],
      wishlistCourses: [],
      lecturers: ["DiogoBarros", "DanielCalvente", "JaimeLaureano"],
      currentLecturer: null,
      uploadedCourses: [],
     }
  }

  componentDidMount() {
    if (this.props.session.isLoggedIn) {
      // Call the API server GET /auth endpoint with our JWT access token
      // get user information from API server
      const option1 = {
        url: `${appConfig.apiUri}/auth`,
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`,
        },
      };

      this.setState({ apiStatus: "Loading..." });

      request.get(option1, (err, resp, body) => {
        let apiStatus, apiResponse;
        if (err) {
          // is API server started and reachable?
          apiStatus = "Unable to reach API";
          console.error(apiStatus + ": " + err);
        } else if (resp.statusCode !== 200) {
          // API returned an error
          apiStatus = "Error response received";
          apiResponse = body;
          console.error(apiStatus + ": " + JSON.stringify(resp));
        } else {
          apiStatus = "Successful response received.";
          apiResponse = body;
        }
        this.setState({ apiStatus, apiResponse });
      });

      const config = {
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`,
        },
      };

      // Get user nickname and profile picture
      axios.get(`${appConfig.apiUri}/user`, config)
        .then((response) => {
          this.setState({
            userProfilePic: `${appConfig.apiUri}/${response.data.path}`,
          });
          console.log(response.data);
          this.setState({ nickname: response.data.nickname });
        })
        .catch((error) => {
          console.log(error)
        })

      // Get user registered courses
      axios.get(`${appConfig.apiUri}/user/registered-courses`, config)
        .then((response) => {
          console.log(response.data)
          this.setState({ registeredCourses: response.data })
        })
        .catch((error) => {
          console.log(error)
        })

      // Get user wishlist courses
      axios.get(`${appConfig.apiUri}/user/wishlist-courses`, config)
        .then((response) => {
          console.log(response.data)
          this.setState({ wishlistCourses: response.data })
        })
        .catch((error) => {
          console.log(error)
        })

      // get lecturer information
      axios.get(`${appConfig.apiUri}/lecturer`, config)
        .then((response) => {
          console.log(response.data)
          this.setState({ currentLecturer: response.data })
          this.setState({ uploadedCourses: this.state.currentLecturer.courses })
        })
        .catch((error) => {
          console.log(error)
        })

    }
  }

  onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  openNicknameDialog = () => {
    this.setState({ openDialog: true });
  };

  closeNicknameDialog = () => {
    this.setState({ openDialog: false });
  };  

  handleNicknameChange = (e) => {
    this.setState({ newNickname: e.target.value });
  };

  changeNickname = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.session.credentials.accessToken}`,
      },
    };
    axios
      .put(
        `${appConfig.apiUri}/user/change-nickname`,
        { nickname: this.state.newNickname },
        config
      )
      .then((response) => {
        console.log(response.data); // updated user
        this.setState({ nickname: this.state.newNickname });
      })
      .catch((error) => {
        console.error(error);
      });
      this.setState({ openDialog: false });
  }


  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  uploadProfilePicture = (e) => {
    e.preventDefault();
    if (!this.state.file) {
      return alert('Please select a file first!')
    }
    const formData = new FormData()
    formData.append('profilePic', this.state.file)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${this.props.session.credentials.accessToken}`,
      },
    };
    axios
      .post(`${appConfig.apiUri}/user/upload-image`, formData, config)
      .then((response) => {
        console.log(response)
        this.setState({ userProfilePic: `${appConfig.apiUri}/${response.data.path}` })
        this.setState({ file: null })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  openFilePicker = () => {
    document.getElementById('filePicker').click();
  };

  render () {
    const { theme } = this.props;


    return (
      <div className="Home">
        <header className="Home-header">
          { this.props.session.isLoggedIn ? (
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'60px' }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{ width: 170, height: 170 }}
                    src={this.state.userProfilePic}
                    alt="Profile Picture"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 10,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      height: '40px',
                      width: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button onClick={this.openFilePicker} size="small">
                      <EditIcon />
                    </Button>
                  </Box>
                </Box>
                <Box m={3}>
                  <input type="file" id="filePicker" style={{ display: 'none' }} onChange={this.handleFileChange} />
                  <Button onClick={this.uploadProfilePicture} variant="contained" color="primary" size="small">
                    <strong>Upload</strong>
                  </Button>
                </Box>
              </Box>

              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                flexDirection="column"
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" textAlign="center" ml={1} sx={{fontWeight:'bold'}}>
                    {this.state.nickname ? this.state.nickname : this.props.session.user.userName}
                  </Typography>
                  <Button onClick={this.openNicknameDialog}>
                    <EditIcon />
                  </Button>
                </Box>
                <Typography variant="body1" textAlign="center">
                  {this.props.session.user.email}
                </Typography>
              </Box>

              <Dialog open={this.state.openDialog} onClose={this.closeNicknameDialog}>
                <DialogTitle>Change Nickname</DialogTitle>
                <DialogContent>
                  <TextField 
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Nickname"
                    type="text"
                    fullWidth
                    value={this.state.newNickname} 
                    onChange={this.handleNicknameChange} 
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closeNicknameDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.changeNickname} color="primary">
                    Change
                  </Button>
                </DialogActions>
              </Dialog>
              { !this.state.lecturers.includes(this.props.session.user.userName) ? (
              <Box m={2}>
                <Divider sx={{ my: 2, color: 'primary.main', "&::before, &::after": {borderColor: "primary.main"}}} role="presentation" variant="middle" light={true}>
                    <Typography sx={{fontWeight:'bold'}}>Registered</Typography>
                </Divider>

                {this.state.registeredCourses.length > 0 ? (
                  this.state.registeredCourses.map((course, index) => (
                    <RegisteredCourseCard key={index} title={course.course.name} lecturer={course.course.lecturer.name} image={course.course.courseImage} progress={course.progress} />
                  ))
                ) : (
                  <Typography variant="body1" textAlign="center">
                    No registered courses
                  </Typography>
                )}
                
                <Divider sx={{ my: 2, color: 'primary.main', "&::before, &::after": {borderColor: "primary.main"}}} role="presentation" variant="middle" light={true}>
                    <Typography sx={{fontWeight:'bold'}}>Wishlist</Typography>
                </Divider>

                {this.state.wishlistCourses.length > 0 ? (
                  this.state.wishlistCourses.map((course, index) => (
                    <WishlistCourseCard key={index} title={course.name} lecturer={course.lecturer.name} image={course.courseImage} price={course.price} />
                  ))
                ) : (
                  <Typography variant="body1" textAlign="center">
                    No wishlist courses
                  </Typography>
                )}
              </Box>) : (
                <Box m={2}>
                  <Divider sx={{ my: 2, color: 'primary.main', "&::before, &::after": {borderColor: "primary.main"}}} role="presentation" variant="middle" light={true}>
                      <Typography sx={{fontWeight:'bold'}}>Courses Uploaded</Typography>
                  </Divider>

                  { this.state.uploadedCourses.length > 0 ? (
                    this.state.uploadedCourses.map((course, index) => (
                      <WishlistCourseCard key={index} title={course.name} lecturer={this.state.currentLecturer.name} image={course.courseImage} price={course.price} />
                    )
                    )):(
                      <Typography variant="body1" textAlign="center">
                        No courses uploaded
                      </Typography>
                    )}
                </Box>
              )
            }

              <Box display="flex" justifyContent='center' alignItems="center" mt={4}>
                <Button variant="contained" color="primary" onClick={this.onSignOut} >
                  Sign out
                </Button>
              </Box>

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
            </Box>
            
          ) : (
            <GuestHomePage href={cognitoUtils.getCognitoSignInUri()} />
          )}
        </header>
      </div>
    );
  }
}

function ThemedHome(props) {
  const theme = useTheme();

  return <Home {...props} theme={theme} />;
}

export default connect(mapStateToProps)(ThemedHome);

