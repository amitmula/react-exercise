import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import io from 'socket.io-client'

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        const socket = io.connect(process.env.REACT_APP_API_ENDPOINT)
        socket.on('connect', () => {
            socket.emit('join channel', 'cardAdded', function (confirmation) {
                console.log(confirmation);
            })
        });

        socket.on('connect_error', () => {
            console.error('Error connecting to notification service.')
        });

        socket.on('card added', (socketData) => {
            if (socketData) {
                var currentCards = this.state.cards
                currentCards.push(socketData)
                this.setState({ ...this.state, cards: currentCards })
            }
        });

        fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_CONTEXT_PATH + process.env.REACT_APP_API_GET_ALL_CARDS_PATH, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .catch(error => console.error(error))
        .then(resp => {
            this.setState({ ...this.state, cards: Array.isArray(resp) ? resp : [] })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Table data-testid="cardsListTable" test-attribute={this.props.testProp} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Card Number</th>
                            <th>Balance</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cards.length > 0 ? this.state.cards.map((card, index) => {
                            return (
                                <tr key={index}>
                                    <td>{card.name}</td>
                                    <td>{card.number}</td>
                                    <td>{card.balance}</td>
                                    <td>{card.limit}</td>
                                </tr>
                            )
                        }) : <tr><td colSpan="4" className="noResults">No cards found</td></tr> }
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}