import React, { useState, useEffect } from 'react'

//Routers
import { Link } from 'react-router-dom'

//Bootstrap
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'

//JSX Components
import Domains from '../components/Domains'
import DomainForm from '../components/DomainForm'

//Helperss
import { assignTokens } from '../helpers/authHeader'


//Services
import { getDomains } from '../services/domains'

const DomainPage = (props) => {

    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [domains, setDomains] = useState([])



    useEffect(() => {
        const loggedTokensJSON = window.localStorage.getItem('tokens')
        if (loggedTokensJSON) {
          const loggedTokens = JSON.parse(loggedTokensJSON)
          setTokens(loggedTokens)
          setloggedIn(true)
          //loginFormRef.current.toggleVisible()
        }
    
      }, [ ])
    
      useEffect(() => {
        if (tokens.access) {
          assignTokens(tokens)
          getDomains()
            .then(domains => setDomains(domains))
        }
      }, [ tokens ])
    

    return(
        <div>
            <Container fluid="xl">
                <Jumbotron>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h2>Domains</h2>
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
                        {loggedIn && domains
                            .map(domain => 
                                <Domains key={domain.id}
                                        id={domain.id}
                                        domain={domain.domain} 
                                        host_name={domain.host_name}
                                        distinguished_name={domain.distinguished_name}
                                        ipv4address={domain.ipv4address}
                                        acc_admin={domain.acc_admin}
                                        key_name={domain.key_name}  
                                        />)}
                    </Col>
                    <Col>{loggedIn && <DomainForm />}</Col>
                    </Row>
            </Container>
            
        </div>
    )
}

export default DomainPage