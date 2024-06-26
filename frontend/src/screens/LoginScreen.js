import React, {useEffect, useState} from "react";
import {Link, redirect, useLocation, useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            navigate(redirect !== '/' ? '/' + redirect : redirect)
        }
    }, [userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            { error && <Message variant={'danger'}>{error}</Message>}
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'email'}>
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
                <Button
                    type={'submit'}
                    variant={'primary'}
                    className={'btn-block w-100 mt-3'}
                >
                    Sign In
                </Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    New customer <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen