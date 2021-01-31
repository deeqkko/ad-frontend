import React, { useState, useEffect } from 'react'
import { create } from '../services/backendapi'
import { Container, Form, Button } from 'react-bootstrap'

import { get } from '../services/backendapi'
import { assignTokens } from '../helpers/authHeader'

const groupUrl = process.env.REACT_APP_GROUP_URL
const ouUrl = process.env.REACT_APP_OU_URL

const UserForm = (props) => {

    const newUserTemplate = {
        sam_account_name:'',
        given_name:'',
        surname:'',
        account_password:'',
        organizational_unit:'',
        groups:[]
    }


    const [ newUser, setNewUser ] = useState(newUserTemplate)
    const [ groups, setGroups] = useState([])
    const [ ous, setOus] = useState([])

    const handleCreateEntryChange = (event) => {
        const value = event.target.value
        setNewUser({
            ...newUser,
            [event.target.name]: value
            })
        }


    const handleArrayChange = (event) => {
        const value = event.target.value
        if (value === '') {
            setNewUser({
                ...newUser, groups: []
            })
            
        } else {
            setNewUser({
                ...newUser, groups: Array.from(event.target.selectedOptions, (item) => item.value)
            })
            
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await create(props.url, newUser)
        console.log(response)
        setNewUser(newUserTemplate)
    }

    useEffect(() => {
        assignTokens(props.tokens)
        get(ouUrl).then(ous => setOus(ous))
        get(groupUrl).then(groups => setGroups(groups))

    }, [])
    

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
                        <Form.Control as="select"
                            id='organizational_unit'
                            name='organizational_unit'
                            onChange={handleCreateEntryChange}>
                            <option id='none' value=''>None</option>
                            {ous.map(ou => 
                            <option key={ou.id} value={ou.id}>{ou.name}</option>)}
                        </Form.Control>
                        <Form.Label>Groups</Form.Label>
                        <Form.Control as="select" multiple
                            id='groups'
                            name='groups'
                            onChange={handleArrayChange}>
                            <option id='none' value={[]}>None</option>
                            {groups.map(group =>
                            <option key={group.id} value={group.id}>{group.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" id="submit" type="submit">Create</Button>
                </Form>
            </Container>
        </div>
    )

}


export default UserForm