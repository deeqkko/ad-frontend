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
import { get } from '../services/backendapi'

//URL
const groupUrl = process.env.REACT_APP_GROUP_URL


const GroupPage = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [tokens, setTokens] = useState({})
    const [groups, setGroups] = useState([])

    const convertCategory = category => {
        if (category === 1 ) {
            category = "Security"
        } else {
            category = "Distribution"
        }
        return category
    }

    const convertScope = scope => {
        if (scope === 0) {
            scope = "DomainLocal"
        }
        if (scope === 1) {
            scope = "Global"
        }
        if (scope === 2) {
            scope = "Universal"
        }

        return scope
    }


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
          get(groupUrl)
            .then(groups => setGroups(groups))
            .catch(error => setGroups([]))

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
                                    group_category={convertCategory(group.group_category)}
                                    group_scope={convertScope(group.group_scope)}
                                    display_name={group.display_name}
                                    description={group.description}
                                    organizational_unit={
                                        group.organizational_unit
                                        ? group.organizational_unit.name
                                        : 'None'}
                                    url={groupUrl}
                                    />
                            )}
                    </Col>
                    <Col>
                        {loggedIn && <GroupForm tokens={tokens}
                                                url={groupUrl}
                        />}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GroupPage