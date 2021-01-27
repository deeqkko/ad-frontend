import React, {useState, useEffect} from 'react'

//Routers
import { Link } from 'react-router-dom'

//Bootstrap
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'

//JSX Components
import Groups from '../components/Groups'
import GroupForm from '../components/GroupForm'


//Helpers
import { assignTokens } from '../helpers/authHeader'

//Services
import { getGroups } from '../services/groups'
import { getOus } from '../services/ous'

const GroupPage = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [groups, setGroups] = useState([])
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
          getGroups()
            .then(groups => setGroups(groups))
          getOus().then(ous => setOus(ous))
          console.log('Ou', ous)
          console.log('Groups', groups)
        }
      }, [ tokens ])
    
    return(
        <div>
            <Container fluid="xl">
                <Jumbotron>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h2>Groups</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Link to='/'>Main</Link>
                    </Row>
                </Jumbotron>
            </Container>
            <Container fluid='xl'>
                <Row>
                    <Col>
                        {loggedIn && groups
                            .map(group =>
                                <Groups key={group.id}
                                    id={group.id}
                                    name={group.name}
                                    sam_account_name={group.sam_account_name}
                                    group_category={group.group_category}
                                    group_scope={group.group_scope}
                                    display_name={group.display_name}
                                    description={group.description}
                                    organizational_unit={group.organizational_unit}
                                    />
                            )}
                    </Col>
                    <Col>
                        {loggedIn && <GroupForm ous={ous}/>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GroupPage