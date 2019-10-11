let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index')
let card = require('../models/card.model')

chai.should()
chai.use(chaiHttp)

describe('Card', () => {

    beforeEach(() => {
        card.removeAll()
    })

    describe('/GET cards', () => {
        it('it should return an empty list', (done) => {
            chai.request(app)
                .get('/card/getall')
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.have.property('message').be.eql('no cards available')
                    done()
                })
        })
    })

    describe('/POST card', () => {
        it('it should save a card and fetch it', (done) => {
            let card = {
                "name": "Test Card",
                "number": "4375510276155014",
                "balance": 0,
                "limit": 4000
            }
            chai.request(app)
                .post('/card/add')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('The card has been created')
                })
            chai.request(app)
                .get('/card/getall')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(1)
                    done()
                })
        })
    })

    describe('/POST card', () => {
        it('it should give an error if the card number violates luhn10', (done) => {
            let card = {
                "name": "Test Card",
                "number": "437551027615501487",
                "balance": 0,
                "limit": 4000
            }
            chai.request(app)
                .post('/card/add')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.errors[0].should.have.property('msg').eql('invalid card number, must pass luhn validation')
                    done()
                })
        })
    })
    
    describe('/POST card', () => {
        it('it should give an error if the card number contains non numeric characters', (done) => {
            let card = {
                "name": "Test Card",
                "number": "assa",
                "balance": 0,
                "limit": 4000
            }
            chai.request(app)
                .post('/card/add')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.errors[0].should.have.property('msg').eql('card number must contain all digits')
                    done()
                })
        })
    })
    
    describe('/POST card', () => {
        it('it should give an error if the card number exceeds 19 in length', (done) => {
            let card = {
                "name": "Test Card",
                "number": "689878798797978967879",
                "balance": 0,
                "limit": 4000
            }
            chai.request(app)
                .post('/card/add')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.errors[0].should.have.property('msg').eql('card number can be max 19 digits long')
                    done()
                })
        })
    })
    
    describe('/POST card', () => {
        it('it should give an error if balance > 0 for new cards', (done) => {
            let card = {
                "name": "Test Card",
                "number": "4375510276155014",
                "balance": 500,
                "limit": 4000
            }
            chai.request(app)
                .post('/card/add')
                .send(card)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.errors[0].should.have.property('msg').eql('balance must be 0 for new cards')
                    done()
                })
        })
    })
})
