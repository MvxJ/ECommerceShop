import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const { shippingAddress } = cart
    const navigate = useNavigate()
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postCode, setPostCode] = useState(shippingAddress?.postCode)
    const [country, setCountry] = useState(shippingAddress?.country)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, postCode, country
        }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps
                step1={true}
                step2={true}
            />
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        required={true}
                        type={'text'}
                        placeholder={'Enter address'}
                        value={address ?? ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className={'mt-3'}>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        required={true}
                        type={'text'}
                        placeholder={'Enter city'}
                        value={city ?? ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className={'mt-3'}>
                    <Form.Label>
                        PostCode
                    </Form.Label>
                    <Form.Control
                        required={true}
                        type={'text'}
                        placeholder={'Enter postcode'}
                        value={postCode ?? ''}
                        onChange={(e) => setPostCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className={'mt-3'}>
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        required={true}
                        type={'text'}
                        placeholder={'Enter country'}
                        value={country ?? ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className={'w-100 mt-3'} variant={'primary'} type={'submit'}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen