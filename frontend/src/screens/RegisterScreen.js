import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";

function RegisterScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            console.log('navigate')
            navigate(redirect !== '/' ? '/' + redirect : redirect)
        }
    }, [userInfo, redirect]);

    const submitHandler = (e) => {
        setMessage('');
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords doesn\'t match');

            return;
        }

        dispatch(register(name, email, password));
    }

    return (
        <FormContainer>
            <h1>Register Account</h1>
            {message && <Message variant={'danger'}>{message}</Message>}
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>
                        Email address
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
                        required={true}
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
                        required={true}
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
                    Register
                </Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen