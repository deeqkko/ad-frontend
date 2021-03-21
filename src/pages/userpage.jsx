import React, {useState, useEffect} from 'react'

//Routers
import { Link } from 'react-router-dom'

//Bootstrap
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'

//JSX Components
import Users from '../components/Users'
import UserForm from '../components/UserForm'

//Helpers
import { assignTokens } from '../helpers/authHeader'

//Services
import { get } from '../services/backendapi'

//URL
const userUrl = process.env.REACT_APP_USER_URL

const UserPage = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [users, setUsers] = useState([])


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
          get(userUrl)
            .then(users => setUsers(users))
            .catch(error => setUsers([]))
        }
      }, [ tokens ])
    
    return(
        <div>
            <Container fluid="xl">
                <Jumbotron>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h2>Users</h2>
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
                        {loggedIn && users
                            .map(user => 
                                <Users key={user.id}
                                    tokens={tokens}
                                    id={user.id}
                                    sam_account_name={user.sam_account_name}
                                    given_name={user.given_name}
                                    surname={user.surname}
                                    organizational_unit={user.organizational_unit ? user.organizational_unit.name : "None"}
                                    groups={user.groups ? user.groups.map(group => group.name) : "None"}
                                    domains={user.domains ? user.domains.map(domain => domain.domain) : "None"}
                                    groupids={user.groups ? user.groups.map(group => group.id) : []}
                                    url={userUrl}
                                    />
                            )}
                    </Col>
                    <Col>
                        {loggedIn && <UserForm tokens={tokens}
                                                url={userUrl}
                        />}
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default UserPage