import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { assignTokens } from '../helpers/authHeader'
import { get, updateGroups, updateOu, 
         removeAllGroups} from '../services/backendapi'

const groupUrl = process.env.REACT_APP_GROUP_URL
const ouUrl = process.env.REACT_APP_OU_URL

const UpdateForm = (props) => {


    const [ groups, setGroups ] = useState([])
    const [ ous, setOus ] = useState([]) 
    const [ ouUpdate, setOuUpdate ] = useState(null)
    const [ groupUpdate, setGroupUpdate ] = useState(null)
    const [ currentGroups, setCurrentGroups] = useState(props.currentGroups)


    const handleOuEntryChange = (event) => {
        const value = event.target.value
        setOuUpdate(value)
    }

    const handleGroupArrayChange = (event) => {
        const selection = Array.from(event.target.selectedOptions, (item) => item.value)
        setCurrentGroups(selection)
        setGroupUpdate(selection)
        console.log('handleGroupArrayChange', groupUpdate)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        let response = null
        console.log('groupsUpdate',(groupUpdate), 'ouUpdate', (ouUpdate))

        if (groupUpdate) {
            response = await updateGroups(props.url, props.id, groupUpdate)
            setGroupUpdate([])
        }
        if (ouUpdate) {
            response = await updateOu(props.url, props.id, ouUpdate)
            setOuUpdate('')
        }   
        return response
    }

    const handleGroupRemoval = async (event) => {
        event.preventDefault()
        let groups = props.currentGroups
        const response = await removeAllGroups(props.url, props.id, groups)
        setCurrentGroups([])
        setGroupUpdate([])
        return response
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
                        <Form.Label>Organizational Unit</Form.Label>
                        <Form.Control as="select"
                            name='organizational_unit'
                            onChange={handleOuEntryChange}>
                            <option value=''>None</option>
                            {ous.map(ou => 
                            <option key={ou.id} value={ou.id}>{ou.name}</option>)}
                        </Form.Control>
                        <Form.Label>Groups</Form.Label>
                        <Form.Control as="select" multiple
                            value={currentGroups}
                            name='groups'
                            onChange={handleGroupArrayChange}>
                            {groups.map(group =>
                            <option key={group.id} 
                                    value={group.id}>
                                    {group.name}
                                    </option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant='primary' id={props.id} type='submit'>Update</Button>
                    <Button variant='danger' 
                        id='remove_from_groups'
                        onClick={handleGroupRemoval}>Remove from groups</Button>
                </Form>
            </Container>
        </div>
    )
}

export default UpdateForm