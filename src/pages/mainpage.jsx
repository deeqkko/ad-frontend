import React, { useState, useEffect, useRef } from 'react'
import LoginForm from '../components/LoginForm'
import DomainForm from '../components/DomainForm'
import Domains from '../components/Domains'
import loginService from '../services/login'
import domainService from '../services/domains'
import authHeader from '../helpers/authHeader'
// import jwt_decode from 'jwt-decode'

import Jumbotron from 'react-bootstrap/Jumbotron'
import {Container, Row, Col}  from 'react-bootstrap'
import { Link } from 'react-router-dom'


const MainPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tokens, setTokens] = useState({})
  const [domains, setDomains] = useState([])
  const [loggedIn, setloggedIn] = useState(false)

  const loginFormRef = useRef()

  useEffect(() => {
    const loggedTokensJSON = window.localStorage.getItem('tokens')
    if (loggedTokensJSON) {
      const loggedTokens = JSON.parse(loggedTokensJSON)
      setTokens(loggedTokens)
      setloggedIn(true)
      loginFormRef.current.toggleVisible()
    }

  }, [ ])

  useEffect(() => {
    if (tokens.access) {
      authHeader.setTokens(tokens)
      domainService.getAll()
        .then(domains => setDomains(domains))
    }
  }, [ tokens ])



  


  const handleLogin = async (event) => {
    event.preventDefault() 
    try {
      const usertokens = await loginService.login({ username, password })
      console.log('From app.js ',usertokens)
      authHeader.setTokens(usertokens)
      setTokens(usertokens)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('tokens', JSON.stringify(usertokens))
      setloggedIn(true)
      loginFormRef.current.toggleVisible()   
    }
    catch (exception) {
      console.log(exception)
      setUsername('')
      setPassword('')
    }
  }

  const logOut = () => {
    setTokens({})
    setloggedIn(false)
    window.localStorage.removeItem('tokens')
    loginFormRef.current.toggleVisible()
    authHeader.removeTokens()
  }


  return(

  <div>
    <Container fluid="xl">
    <Jumbotron>
    <Row className="justify-content-md-center">
    <Col> 
      {loggedIn ? <h1>Adusermizer Logged</h1> : <h1>Adusermizer</h1>}
      </Col>
      </Row>
      <Row>
    <Col>
      <LoginForm ref={loginFormRef}
        username={username}
        password={password}
        setUsername={({ target }) => setUsername(target.value)}
        setPassword={({ target }) => setPassword(target.value)} 
        handleLogin={handleLogin}
        handleLogout={logOut}
        />
        </Col>
        </Row>
        </Jumbotron>
    </Container>
    {loggedIn && 
        <div>
            <Link to="/domains">Domains</Link>
            <Link to="/users">Users</Link>
        </div>
    }
    
  </div>
  )
}

export default MainPage;
