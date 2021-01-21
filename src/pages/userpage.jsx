import React, {useState, useEffect} from 'react'

//Routers
import { Link } from 'react-router-dom'

//Bootstrap
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'

//JSX Components
import Users from '../components/Users'
import UserForm from '../components/UserForm'

//Helpers
import authHeader from '../helpers/authHeader'

//Services
import userService from '../services/users'

const UserPage = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [users, setUsers] = useState([])

    const handleNull = (objectArray) => {
        return(
            objectArray ? objectArray.map(object => object.propName) : "none"
        )}

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
          authHeader.setTokens(tokens)
          userService.getAll()
            .then(users => setUsers(users))
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
                                    id={user.id}
                                    sam_account_name={user.sam_account_name}
                                    given_name={user.given_name}
                                    surname={user.surname}
                                    organizational_unit={user.organizational_unit ? user.organizational_unit.map(ou => ou.name) : "None"}
                                    groups={user.groups ? user.groups.map(group => group.name) : "None"}
                                    domains={user.domains ? user.domains.map(domain => domain.domain) : "None"}
                                    />
                            )}
                    </Col>
                    <Col>
                        {loggedIn && <UserForm />}
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default UserPage