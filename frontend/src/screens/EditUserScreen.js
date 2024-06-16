import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, login, register, updateUserAction} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import {USER_UPDATE_RESET} from "../constants/userConstants";

function EditUserScreen({ match }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails
    const userUpdate = useSelector(state => state.updateUser)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type:USER_UPDATE_RESET})
            navigate(`/admin/users`)
        } else {
            if (!user || user._id != id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setIsAdmin(user.isAdmin)
                setEmail(user.email)
            }
        }
    }, [id, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserAction({
            _id: user._id,
            name: name,
            email: email,
            isAdmin: isAdmin
        }))
    }

    return (
        <div>
            <Link to={`/admin/users`}>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User #{id}</h1>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant={'danger'}>{errorUpdate}</Message>: (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId={'name'}>
                            <Form.Label>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type={'text'}
                                placeholder={'John Doe'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={'email'} className={'mt-3'}>
                            <Form.Label>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type={'email'}
                                placeholder={'example@email.com'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={'is-admin'} className={'mt-3'}>
                            <Form.Label>
                                Admin
                            </Form.Label>
                            <Form.Check
                                type={'checkbox'}
                                placeholder={'Admin'}
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >

                            </Form.Check>
                        </Form.Group>
                        <Button
                            type={'submit'}
                            variant={'primary'}
                            className={'btn-block w-100 mt-3'}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default EditUserScreen