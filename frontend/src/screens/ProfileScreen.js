import React, { useEffect, useState } from "react";
import {Row, Col, Form, Button, Table} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {userOrdersList} from "../actions/orderActions";
import {LinkContainer} from "react-router-bootstrap";

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
    const orderList = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderList
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
                dispatch(userOrdersList())
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
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant={'danger'}>{errorOrders}</Message>
                ) : (
                    <Table striped responsive={true} className={'table-sm'}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>#{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid == true ? order.paidAt.substring(0,10) : (<i className={'fas fa-times'} style={{color: 'red'}}></i>)}</td>
                                    <td>{order.isDelivered == true ? order.deliveredAt.substring(0,10) : (<i className={'fas fa-times'} style={{color: 'red'}}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className={'btn btn-block w-100'}>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen