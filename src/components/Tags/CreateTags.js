import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addTag } from '../../reducers/Tags/tags';

const CreateTags = () => {
    const dispatch = useDispatch();
    const [tagForm, setTagForm] = useState({
        name: '',
        logo: ''
    })

    const onChangeTag = (event) => {
        setTagForm({
            ...tagForm,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitTag = (event) => {
        event.preventDefault()
        dispatch(addTag(tagForm))
    }
    const {name, logo} = tagForm
    return (
        <>
        <Form className='my-4' onSubmit={onSubmitTag}>
            <Form.Group >
                <Form.Control type='text'
                    placeholder='ten'
                    name='name'
                    require='true'
                    value={name}
                    onChange={onChangeTag}
                />
            </Form.Group>
            <Form.Group >
                <Form.Control type='text'
                    placeholder='hinh'
                    name='logo'
                    require='true'
                    value={logo}
                    onChange={onChangeTag}
                />
            </Form.Group>
            <Button variant='success' type='submit'>Register</Button>
        </Form>
    </>
    )
}

export default CreateTags
