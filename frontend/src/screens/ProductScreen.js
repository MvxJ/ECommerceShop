import React, {useEffect, useState} from "react";
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen({ match }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector(state => state.productDetails)
    const { error, loading, product } = details;

    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, match]);

    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            { loading ? <Loader /> :
                error ? <Message variant={'danger'}>{error}</Message> :
                    (
                        <Row>
                            <Col md={6}>
                                <Image  src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant={'flush'}>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <strong>Price:</strong> ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <strong>Description:</strong> {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant={'flush'}>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button className={'btn-block w-100'} type={'button'} disabled={product.countInStock > 0 ? false: true}>
                                                Add to cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </div>
    )
}

export default ProductScreen