import React, { useState } from 'react'
import ouServices from '../services/ous'
import { Container, Form, Button } from 'react-bootstrap'

const OuForm = () => {

    const newOuTemplate = {name: ''}

    const [ newOu, setNewOu ] = useState(newOuTemplate)

    const handleCreateEntryChange = (event) => {
        const value = event.target.value
        setNewOu({
            ...newOu,
            [event.target.name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await ouServices.createOu(newOu)
        console.log(response)
        setNewOu(newOuTemplate)
    }

    return(
        <div>
            <Container fluid>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            id='name'
                            type='text'
                            value={newOu.name}
                            name='name'
                            onChange={handleCreateEntryChange}
                            placeholder='Organizational unit name'
                        />
                    </Form.Group>
                    <Button variant='primary' id='submit' type='submit'>Create</Button>
                </Form>
            </Container>
        </div>
    )
}

export default OuForm