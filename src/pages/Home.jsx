import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import cognitoUtils from '../lib/cognitoUtils'
import request from 'request'
import appConfig from '../config/app-config.json'

const mapStateToProps = state => {
  return { session: state.session }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { apiStatus: 'Not called', file: null, userProfilePic: null, nickname: null, newNickName:"" }
  }

  componentDidMount () {
    if (this.props.session.isLoggedIn) {
      // Call the API server GET /auth endpoint with our JWT access token
      // get user information from API server
      const option1 = {
        url: `${appConfig.apiUri}/auth`,
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`
        }
      }

      this.setState({ apiStatus: 'Loading...' })
      request.get(option1, (err, resp, body) => {
        let apiStatus, apiResponse
        if (err) {
          // is API server started and reachable?
          apiStatus = 'Unable to reach API'
          console.error(apiStatus + ': ' + err)
        } else if (resp.statusCode !== 200) {
          // API returned an error
          apiStatus = 'Error response received'
          apiResponse = body
          console.error(apiStatus + ': ' + JSON.stringify(resp))
        } else {
          apiStatus = 'Successful response received.'
          apiResponse = body
        }
        this.setState({ apiStatus, apiResponse })
      })

      const config = {
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`
        }
      }

      axios.get(`${appConfig.apiUri}/user`, config)
        .then((response) => {
          this.setState({ userProfilePic: `${appConfig.apiUri}/${response.data.path}` })
          console.log(response.data)
          this.setState({ nickname: response.data.nickname })
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


  handleNicknameChange = (e) => {
    this.setState({ newNickname: e.target.value })
  }

  changeNickname = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.session.credentials.accessToken}`
      }
    }
    axios.put(`${appConfig.apiUri}/user/change-nickname`, { nickname: this.state.newNickname }, config)
      .then(response => {
        console.log(response.data); // updated user
        this.setState({ nickname: this.state.newNickname });
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] })
  }

  uploadProfilePicture = (e) => {
    const formData = new FormData()
    formData.append('profilePic', this.state.file)
    const config = {
      headers: { 
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.session.credentials.accessToken}` 
      }
    };
    axios.post(`${appConfig.apiUri}/user/upload-image`, formData, config)
      .then((response) => {
        console.log(response)
        this.setState({ userProfilePic: `${appConfig.apiUri}/${response.data.path}` })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  render () {
    return (
      <div className="Home">
        <header className="Home-header">
          { this.props.session.isLoggedIn ? (
            <div>
              {/* <p>Welcome! {this.props.session.user.userName}</p> */}
              <p>Welcome! {this.state.nickname}</p>
              <img src={this.state.userProfilePic}/>
              <p>{this.props.session.user.email}</p>


              {/* <button onClick={this.changeNickname}>Change my nickname</button> */}
              <form onSubmit={this.changeNickname}>
                <label>
                  New Nickname:
                  <input 
                    type="text" 
                    value={this.state.newNickname} 
                    onChange={this.handleNicknameChange} 
                  />
                </label>
                <button type="submit">Submit</button>
              </form>


              <div>
                <input type="file" onChange={this.handleFileChange}/>
                <button onClick={this.uploadProfilePicture}>Upload profile picture</button>
              </div>


              <hr></hr>
              <div>
                <div>API status: {this.state.apiStatus}</div>
                <div className="Home-api-response">{this.state.apiResponse}</div>
              </div>
              <p></p>
              <a className="Home-link" href="#" onClick={this.onSignOut}>Sign out</a>
            </div>
          ) : (
            <div>
              <p>You are not logged in.</p>
              <a className="Home-link" href={cognitoUtils.getCognitoSignInUri()}>Sign in</a>
            </div>
          )}

        </header>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
