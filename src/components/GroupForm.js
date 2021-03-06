import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import { get, create } from '../services/backendapi'
import { assignTokens } from '../helpers/authHeader'

const ouUrl = process.env.REACT_APP_OU_URL

const GroupForm = (props) => {
    
    const newGroupTemplate = {
        name:'',
        sam_account_name:'',
        group_category: 0,
        group_scope: 0,
        display_name:'',
        description:'',
        organizational_unit:''
    }

    const [ newGroup, setNewGroup ] = useState(newGroupTemplate)
    const [ ous, setOus ] = useState([])



    const handleCreateEntryChange = (event) => {
        var value = event.target.value
        if (event.target.id === ("group_category" || "group_scope")) {
            if (value === "Distribution" || "DomainLocal") {
                value = parseInt(0)
            }
    
            if (value === "Security" || "Global" ) {
                value = parseInt(1)
            }
    
            if (value === "Universal") {
                value = parseInt(2)
            }
        }
        

        setNewGroup({
            ...newGroup,
            [event.target.name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await create(props.url, newGroup)
        console.log(response)
        setNewGroup(newGroupTemplate)
    }

    useEffect(() => {
        assignTokens(props.tokens)
        get(ouUrl).then(ous => setOus(ous))
    }, [])

    return(
        <div>
            <Container>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control size="sm"
                            id='name'
                            type='text'
                            value={newGroup.name}
                            name='name'
                            onChange={handleCreateEntryChange}
                            placeholder='Group name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>sAMAccount Name</Form.Label>
                        <Form.Control size="sm"
                            id='sam_account_name'
                            type='text'
                            value={newGroup.sam_account_name}
                            name='sam_account_name'
                            onChange={handleCreateEntryChange}
                            placeholder='sAMAccount name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group Category</Form.Label>
                        <Form.Control as='select'
                            size="sm"
                            id='group_category'
                            value={newGroup.group_category}
                            name='group_category' 
                            onChange={handleCreateEntryChange}>
                            <option>Distribution</option>
                            <option>Security</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group Scope</Form.Label>
                        <Form.Control as='select'
                            size="sm"
                            id='group_scope'
                            value={newGroup.group_scope}
                            name='group_scope'
                            onChange={handleCreateEntryChange}>
                            <option>DomainLocal</option>
                            <option>Global</option>
                            <option>Universal</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control size="sm"
                            id='display_name'
                            type='text'
                            value={newGroup.display_name}
                            name='display_name'
                            onChange={handleCreateEntryChange}
                            placeholder='Group display name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control size="sm"
                            id='description'
                            type='text'
                            value={newGroup.description}
                            name='description'
                            onChange={handleCreateEntryChange}
                            placeholder='Group Description' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Organizational Unit</Form.Label>
                        <Form.Control as='select'
                            size='sm'
                            id='organizational_unit'
                            value={newGroup.organizational_unit}
                            name='organizational_unit'
                            onChange={handleCreateEntryChange}>
                            <option id='none' value=''>None</option>
                            {ous.map(ou => 
                                <option key={ou.id} value={ou.id}>{ou.name}</option>)}
                            </Form.Control>
                    </Form.Group>
                    <Button variant='primary' id='submit' type='submit'>Create</Button>
                </Form>
            </Container>
        </div>
    )
}

export default GroupForm