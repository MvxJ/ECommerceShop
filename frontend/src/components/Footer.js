import { Container, Row, Col } from 'react-bootstrap';
import React from "react";

function Footer() {
    return (
        <div>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Maksymilian Jachymczak 13037
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer