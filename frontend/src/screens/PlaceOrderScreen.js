import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import {Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    cart.shippingPrice = cart.itemsPrice > 100.00 ? (0.00).toFixed(2) : (10.00).toFixed(2)
    cart.taxPrice = ((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if (cart.paymentMethod === undefined) {
        navigate('/payment')
        cart.paymentMethod = 'PayPal'
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success]);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps
                step1={true}
                step2={true}
                step3={true}
                step4={true}
            />
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},
                                &nbsp;{cart.shippingAddress.city},
                                &nbsp;{cart.shippingAddress.postCode},
                                &nbsp;{cart.shippingAddress.country}.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Payment: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ?
                                <Message variant={'info'}>
                                    Your cart is empty
                                </Message> : (
                                    <ListGroup variant={'flush'}>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid={true} rounded={true} />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.quantity } X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant={'danger'}>{error}</Message> }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type={'button'}
                                    variant={'primary'}
                                    className={'bnt-block w-100'}
                                    disabled={cart.cartItems === 0}
                                    onClick={handleSubmit}
                                >
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen