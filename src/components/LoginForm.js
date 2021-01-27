import React, { useState, useImperativeHandle } from 'react'
import { Form, Button } from 'react-bootstrap'


const LoginForm = React.forwardRef(({
  username,
  password,
  handleLogin,
  handleLogout,
  setUsername,
  setPassword
}, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return(
    <div>
    <div style={hideWhenVisible}>
    <Form onSubmit={handleLogin}>
      <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control 
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={setUsername} 
        placeholder="Enter username"  
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          name="Password"
          placeholder="Enter password"
          onChange={setPassword}
        />
      </Form.Group>
      <Button variant="primary" id='login-button' type="submit">Login</Button>
    </Form>
    </div>
    <div style={showWhenVisible}>
      <p>Welcome {username}
      <Button variant="secondary" id='logout-button' onClick={handleLogout}>Logout</Button>
      </p>
    </div>
    
    </div>

  )})

export default LoginForm