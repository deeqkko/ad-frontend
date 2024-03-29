import React, { useState, useEffect } from 'react'

//Routers
import { Link } from 'react-router-dom'

//Bootstrap
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'

//JSX Components
import Ous from '../components/Ou'
import OuForm from '../components/OuForm'

//Helpers
import { assignTokens } from '../helpers/authHeader'

//Services
import { get } from '../services/backendapi'

//URL
const ouUrl = process.env.REACT_APP_OU_URL

const OuPage = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [ous, setOus] = useState([])
    
    useEffect(() => {
        const loggedTokensJSON = window.localStorage.getItem('tokens')
        if (loggedTokensJSON) {
          const loggedTokens = JSON.parse(loggedTokensJSON)
          setTokens(loggedTokens)
          setloggedIn(true)
        }
    
      }, [ ])

      useEffect(() => {
        if (tokens.access) {
          assignTokens(tokens)
          get(ouUrl)
            .then(ous => setOus(ous))
            .catch(error => setOus([]))
        }
        console.log(ous)
      }, [ tokens ])

      return(
        <div>
        <Container fluid="xl">
            <Jumbotron>
                <Row className="justify-content-md-center">
                    <Col>
                        <h2>Organizational Units</h2>
                    </Col>
                </Row>
                <Row>
                    <Link to='/'>Main</Link>
                </Row>
            </Jumbotron>
        </Container>
        <Container fluid="xl">
                <Row>
                    <Col>
                        {loggedIn && ous
                            .map(ou => 
                                <Ous key={ou.id}
                                      id={ou.id}
                                      name={ou.name}
                                      url={ouUrl} 
                                        />)}
                    </Col>
                    <Col>{loggedIn && <OuForm url={ouUrl}/>}</Col>
                    </Row>
            </Container>
        </div>
      )
}

export default OuPage