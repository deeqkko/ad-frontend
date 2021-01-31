import React from 'react'
import { destroy } from '../services/backendapi'
import { Container, Row, Button, ListGroup } from 'react-bootstrap'
import UpdateForm from './UpdateForm'

const Users = (props) => {

    const handleDelete = () => {
        console.log(props)
        destroy(props.url, props.id)
    }

    return(
        <div>
            <Container>
                <Row>
                    <ListGroup>
                        <ListGroup.Item>Account Name:{props.sam_account_name}</ListGroup.Item>
                        <ListGroup.Item>First Name:{props.given_name}</ListGroup.Item>
                        <ListGroup.Item>Last Name:{props.surname}</ListGroup.Item>
                        <ListGroup.Item>Organizational unit:{props.organizational_unit}</ListGroup.Item>
                        <ListGroup.Item>Groups:{props.groups}</ListGroup.Item>
                        <ListGroup.Item>Domains:{props.domains}</ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="danger" id="delete" onClick={handleDelete}>Delete</Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <UpdateForm tokens={props.tokens}
                                    id = {props.id}
                                    currentGroups = {props.groupids}
                                    url={props.url}
                         />
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </div>
    )
}

export default Users