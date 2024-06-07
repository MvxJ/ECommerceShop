import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {Button, Col, Form} from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps
                step1={true}
                step2={true}
                step3={true}
            />
            <h1>Payment method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            className={'mt-3'}
                            type={'radio'}
                            label={'PayPal or Credit Card'}
                            id={'paypal'}
                            name={'paymentMethod'}
                            checked={true}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button
                    className={'w-100 mt-3'}
                    type={'submit'}
                    variant={'primary'}
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen