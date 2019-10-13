import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AddNewCard from './components/newCardForm/newCardForm'
import CardList from './components/cardList/cardList'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header></Header>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4} className="formArea">
            <h3>Add</h3>
            <AddNewCard testProp="testPropVal" />
          </Col>
          <Col xs={12} md={8} className="listArea">
            <h3>Existing Cards</h3>
            <CardList testProp="testPropVal" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
