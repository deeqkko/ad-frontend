import React from 'react'
import { deleteOu } from '../services/ous'
import { Container, Row, Button, ListGroup } from 'react-bootstrap'

const Ous = (props) => {

    console.log(props)

    const handleDelete = () => {
        console.log(props)
        deleteOu(props.id)
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

