import React from 'react'
import { destroy } from '../services/backendapi'
import { Container, Row, Button, ListGroup } from 'react-bootstrap'

const Ous = (props) => {

    console.log(props)

    const handleDelete = () => {
        console.log(props)
        destroy(props.url, props.id)
    }

    return(
        <div>
            <Container>
                <Row>
                    <ListGroup>
                    <ListGroup.Item>Name:{props.name}</ListGroup.Item>
                    <ListGroup.Item>
                        <Button variant="danger" id="delete" onClick={handleDelete}>Delete</Button>
                    </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </div>
    )
}

export default Ous

