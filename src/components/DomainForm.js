import React, { useState } from 'react'
import domainServices from '../services/domains'
import { Container, Form, Button } from 'react-bootstrap'

const DomainForm = () => {

    const newDomainTemplate = {
        domain:'',
        host_name:'',
        ipv4address:'',
        acc_admin:'',
        key_name:''
    }

    const [ newDomain, setNewDomain ] = useState(newDomainTemplate)

    const handleCreateEntryChange = (event) => {
        const value = event.target.value
        setNewDomain({
            ...newDomain,
            [event.target.name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await domainServices.createDomain(newDomain)
        console.log(response)
        setNewDomain(newDomainTemplate)
    }

    return(
        <div>
        <Container fluid>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Domain</Form.Label>
                    <Form.Control size="sm"
                        id='domain'
                        type="text"
                        value={newDomain.domain}
                        name="domain"
                        onChange={handleCreateEntryChange}
                        placeholder="Domain name (e.g. example.com)"
                        /> 
                </Form.Group>
                <Form.Group>
                    <Form.Label>Host name</Form.Label>
                    <Form.Control size="sm"
                        id='host_name'
                        type="text"
                        value={newDomain.host_name}
                        name="host_name"
                        onChange={handleCreateEntryChange}
                        placeholder="Host name (e.g. dc01)"
                        /> 
                </Form.Group>              
                <Form.Group>
                    <Form.Label>IPv4 Address</Form.Label>
                    <Form.Control size="sm"
                        id='ipv4address'
                        type="text"
                        value={newDomain.ipv4address}
                        name="ipv4address"
                        onChange={handleCreateEntryChange}
                        placeholder="IPv4 Address (e.g. 192.168.0.1)"
                        /> 
                </Form.Group>
                <Form.Group>
                    <Form.Label>Account administrator</Form.Label>
                    <Form.Control size="sm"
                        id='acc_admin'
                        type="text"
                        value={newDomain.acc_admin}
                        name="acc_admin"
                        onChange={handleCreateEntryChange}
                        placeholder="Domain account administrator username"
                        /> 
                </Form.Group>
                <Form.Group>
                    <Form.Label>SSH key name</Form.Label>
                    <Form.Control size="sm"
                        id='key_name'
                        type="text"
                        value={newDomain.key_name}
                        name="key_name"
                        onChange={handleCreateEntryChange}
                        placeholder="SSH key file name"
                        /> 
                </Form.Group>
                <Button variant="primary" id="submit" type="submit">Connect</Button>
            </Form>
            </Container>   
        </div>
    )
}

export default DomainForm