import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import io from 'socket.io-client';

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            socket: {}
        }
    }

    componentDidMount() {

        this.state.socket = io.connect(process.env.REACT_APP_API_ENDPOINT);

        this.state.socket.on('connect', () => {
            this.state.socket.emit('join channel', 'cardAdded', function (confirmation) {
                console.log("joined channel cardAdded -> ", confirmation);
            });
        });

        this.state.socket.on('connect_error', () => {
            console.error('Error connecting to notification service.')
        });

        this.state.socket.on('card added', (socketData) => {
            var respData = socketData;
            console.log('respData -> ', respData)
            if (respData) {
                var currentCards = this.state.cards
                console.log('currentCards -> ', currentCards)
                currentCards.push(respData)
                console.log('updatedCards -> ', currentCards)
                this.setState({...this.state, cards: currentCards})
            }
        });

        fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_CONTEXT_PATH + process.env.REACT_APP_API_GET_ALL_CARDS_PATH, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .catch(error => console.error(error))
            .then(resp => {
                this.setState({ ...this.state, cards: resp });
            })
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Card Number</th>
                        <th>Balance</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.cards.length ? this.state.cards.map((card, index) => {
                        return (
                            <tr key={index}>
                                <td>{card.name}</td>
                                <td>{card.number}</td>
                                <td>{card.balance}</td>
                                <td>{card.limit}</td>
                            </tr>
                        )
                    }) : <tr><td colSpan="4" className="noResults">No cards found</td></tr>}
                </tbody>
            </Table>
        )
    }
}