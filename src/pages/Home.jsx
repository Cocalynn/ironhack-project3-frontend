import React, { Component } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
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
    this.state = { apiStatus: 'Not called' }
  }

  componentDidMount () {
    if (this.props.session.isLoggedIn) {
      // Call the API server GET /users endpoint with our JWT access token
      const option1 = {
        url: `${appConfig.apiUri}/users`,
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


      // Call the API server GET /user endpoint with our JWT access token
      const option2 = {
        url: `${appConfig.apiUri}/user`,
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`
        }
      }
      
      request.get(option2, (err, resp, body) => {
        let user, profileImage
        if (err) {
          // is API server started and reachable?
          console.error('Unable to reach API: ' + err)
        }
        else if (resp.statusCode !== 200) {
          // API returned an error
          console.error('Error response received: ' + JSON.stringify(resp))
        }
        else {
          user = body // user is a string
          profileImage = JSON.parse(user).profileImage
        }
        this.setState({ user, profileImage })
      })
    }
  }

  // getUser = (e) => {
  //   e.preventDefault()
  //   const [user, setUser] = useState(null)
  //   axios.get(`${appConfig.apiUri}/user`)
  //     .then((response) => {
  //       const currentUser = response.data
  //       setUser(currentUser)
  //       console.log(user)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // useEffect(() => {
  //   getUser()
  // }, []);

  onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  changeNickname = (e) => {
    console.log('changeNickname')
  }

  uploadProfilePicture = (e) => {
    console.log('uploadProfilePicture')
  }

  render () {
    return (
      <div className="Home">
        <header className="Home-header">
          { this.props.session.isLoggedIn ? (
            <div>
              <p>Welcome! {this.props.session.user.userName}</p>
              <img src={this.state.profileImage}/>
              <p>{this.props.session.user.email}</p>
              <button onClick={this.changeNickname}>Change my nickname</button>
              <button onClick={this.uploadProfilePicture}>Upload profile picture</button>
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
