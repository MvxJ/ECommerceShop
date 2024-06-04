import React, { useEffect, useState } from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const userDetails = useSelector(state => state.userDetails)
    const userLogin = useSelector(state => state.userLogin)
    const userUpdateProfile = useSelector(state => state.userProfileUpdate)
    const { userInfo } = userLogin
    const { error, loading, user } = userDetails
    const { success } = userUpdateProfile
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Passwords doesn\'t match');

            return;
        }

        dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password
        }));
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant={'danger'}>{message}</Message>}
                {error && <Message variant={'danger'}>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={'name'}>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder={'John Doe'}
                            value={name}
                            required={true}
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
                            required={true}
                            placeholder={'example@email.com'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'password'} className={'mt-3'}>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'confirmPassword'} className={'mt-3'}>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'confirm password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        className={'btn-block w-100 mt-3'}
                    >
                        Update profile!
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen