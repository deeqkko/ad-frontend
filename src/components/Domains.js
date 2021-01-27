import React from 'react'
import { deleteDomain } from '../services/domains'
import { Container, Row, Button, ListGroup } from 'react-bootstrap'

const Domains = (props) => {


    const handleDelete = () => {
        console.log(props)
        deleteDomain(props.id)
    }

    return(
        <div>
        <Container>
        <Row>
        <ListGroup>
            <ListGroup.Item>Domain: {props.domain}</ListGroup.Item>
            <ListGroup.Item>Hostname: {props.host_name}</ListGroup.Item>
            <ListGroup.Item>Distinguished name: {props.distinguished_name}</ListGroup.Item>
            <ListGroup.Item>IPV4Address: {props.ipv4address}</ListGroup.Item>
            <ListGroup.Item>Account administrator: {props.acc_admin}</ListGroup.Item>
            <ListGroup.Item>SSH key name: {props.key_name}</ListGroup.Item>
            <ListGroup.Item>
                <Button variant="danger" id="delete" onClick={handleDelete}>Delete</Button>
            </ListGroup.Item>
        </ListGroup>
        </Row>
        <Row>
            
            </Row>
         </Container>
        </div>
    )
}

export default Domains