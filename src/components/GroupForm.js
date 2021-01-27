import React, { useState } from 'react'
import { createGroup } from '../services/groups'
import { Container, Form, Button } from 'react-bootstrap'

const GroupForm = (props) => {
    
    const newGroupTemplate = {
        name:'',
        sam_account_name:'',
        group_category:'',
        group_scope:'',
        display_name:'',
        description:'',
        organizational_unit:''
    }

    const [ newGroup, setNewGroup ] = useState(newGroupTemplate)


    const handleCreateEntryChange = (event) => {
        const value = event.target.value
        setNewGroup({
            ...newGroup,
            [event.target.name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await createGroup(newGroup)
        console.log(response)
        setNewGroup(newGroupTemplate)
    }

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
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
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
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
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
                            {props.ous ? props.ous.map(ou => <option>{ou.name}</option>) : "None"}
                            </Form.Control>
                    </Form.Group>
                    <Button variant='primary' id='submit' type='submit'>Create</Button>
                </Form>
            </Container>
        </div>
    )
}

export default GroupForm