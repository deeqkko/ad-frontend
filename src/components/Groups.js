import React from 'react'
import { deleteGroup } from '../services/groups'
import { Container, Row, Button, ListGroup } from 'react-bootstrap'


const Groups = (props) => {
    const handleDelete = () => {
        console.log(props)
        deleteGroup(props.id)
    }

    return(
        <div>
            <Container>
                <Row>
                    <ListGroup>
                        <ListGroup.Item>Name: {props.name}</ListGroup.Item>
                        <ListGroup.Item>sAMAccount Name {props.sam_account_name}</ListGroup.Item>
                        <ListGroup.Item>Group Category: {props.group_category}</ListGroup.Item>
                        <ListGroup.Item>Group Scope: {props.group_scope}</ListGroup.Item>
                        <ListGroup.Item>Display Name: {props.display_name}</ListGroup.Item>
                        <ListGroup.Item>Description: {props.description}</ListGroup.Item>
                        <ListGroup.Item>Organizational Unit: {props.organizational_unit} </ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="danger" id="delete" onClick={handleDelete}>Delete</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </div>
    )
}

export default Groups