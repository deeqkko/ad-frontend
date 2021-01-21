import React, { useState } from 'react'
import userService from '../services/users'
import { Container, Form, Button } from 'react-bootstrap'

const UserForm = () => {

    const newUserTemplate = {
        sam_account_name:'',
        given_name:'',
        surname:'',
        account_password:'',
        organizational_unit:'',
        groups:[],
        domains:[]
    }

    const testous = [
        {name: "OU1"},
        {name: "OU2"}
    ]

    const testgroups = [
        {name: "Group1"},
        {name: "Group2"}
    ]

    const [ newUser, setNewUser ] = useState(newUserTemplate)
    const [ groups, setGroups] = useState(testgroups)
    const [ ous, setOus] = useState(testous)

    const handleCreateEntryChange = (event) => {
        const value = event.target.value
        setNewUser({
            ...newUser,
            [event.target.name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await userService.createUser(newUser)
        console.log(response)
        setNewUser(newUserTemplate)
    }
    

    return(
        <div>
            <Container>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control size="sm"
                            id='sam_account_name'
                            type='text'
                            value={newUser.sam_account_name}
                            name='sam_account_name'
                            onChange={handleCreateEntryChange}
                            placeholder="User account name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control size="sm"
                            id='given_name'
                            type='text'
                            value={newUser.given_name}
                            name='given_name'
                            onChange={handleCreateEntryChange}
                            placeholder="Users first name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="sm"
                            id='surname'
                            type='text'
                            value={newUser.surname}
                            name='surname'
                            onChange={handleCreateEntryChange}
                            placeholder="Users last name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="sm"
                            id='account_password'
                            type='password'
                            value={newUser.account_password}
                            name='account_password'
                            onChange={handleCreateEntryChange}
                            placeholder="Users password (Will be prompted to change on first login)" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Organizational Unit</Form.Label>
                        <Form.Control as="select">
                            {ous.map(ou => 
                            <option>{ou.name}</option>)}
                        </Form.Control>
                        <Form.Label>Groups</Form.Label>
                        <Form.Control as="select" multiple>
                            {groups.map(group =>
                            <option>{group.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" id="submit" type="submit">Create</Button>
                </Form>
            </Container>
        </div>
    )

}


export default UserForm