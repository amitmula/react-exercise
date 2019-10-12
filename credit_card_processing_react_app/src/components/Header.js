import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

function Header() {
    return(
        <Jumbotron fluid>
            <Container>
                <h1>Credit Card System</h1>
                <p>
                    You can add a new credit card using the form below.
                </p>
            </Container>
        </Jumbotron>
    )
}
export default Header