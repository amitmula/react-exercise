import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default class AddNewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form : {
                balance: 0
            },
            alertBox: false,
            alertVarient: "primary",
            message : [],
            httpSuccess: true
        }
    }

    setShow(val) {
        this.setState({...this.state, alertBox: val})
    }

    handleSubmit = event => {
        fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_CONTEXT_PATH + process.env.REACT_APP_API_ADD_NEW_CARD_PATH, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.form)
        })
        .then( response => {
            response.ok ? this.setState(Object.assign({}, this.state, { httpSuccess: true })) : this.setState(Object.assign({}, this.state, { httpSuccess: false }))
            return response.json()
        }).then( resp => {
            if(this.state.httpSuccess) {
                this.setState(Object.assign({}, this.state, { message: resp.message, alertVarient: "success", alertBox: true, form: {balance: 0}}))
            } else {
                this.setState(Object.assign({}, this.state, { message: resp.errors[0].msg, alertVarient: "danger", alertBox: true }))
            }
        }).catch( error => {
            console.log("fetch api error -> ", error)
        });
        event.preventDefault();
    }
    

    handleFormChange(event) {
        var addForm = this.state.form
        addForm[event.target.id] = event.target.value
        this.setState({...this.state, form: addForm})
    }

    render() {
        return (
        <div>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={this.state.form.name ? this.state.form.name : ''} onChange={(e) => this.handleFormChange(e)} required />
                </Form.Group>

                <Form.Group controlId="number">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter card number" value={this.state.form.number ? this.state.form.number : ''} onChange={(e) => this.handleFormChange(e)} required />
                </Form.Group>

                <Form.Group controlId="limit">
                    <Form.Label>Limit</Form.Label>
                    <Form.Control type="text" placeholder="Enter Limit" value={this.state.form.limit ? this.state.form.limit : ''} onChange={(e) => this.handleFormChange(e)} required />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Add
                </Button>
            </Form>
            { this.state.alertBox ?  <Alert variant={this.state.alertVarient} className="alertBox" onClose={() => this.setShow(false)} dismissible>
                {this.state.message}
            </Alert> : '' }
        </div>)
    }
}