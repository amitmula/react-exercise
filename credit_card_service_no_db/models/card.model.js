const config = require('config');
const filename = config.DBFile
let cards = require('../data/' + filename)
const helper = require('../helpers/helper.js')

function getAllCards() {
    return new Promise((resolve, reject) => {
        if (cards.length === 0) {
            reject({
                message: 'no cards available',
                status: 202
            })
        }
        resolve(cards)
    })
}

function addCard(newCard) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(cards) }
        newCard = { ...id, ...newCard }
        cards.push(newCard)
        helper.writeJSONFile('./data/' + filename, cards)
        resolve(newCard)
    })
}

function removeAll() { //for tests
    return new Promise((resolve, reject) => {
        cards.length = 0
        helper.writeJSONFile('./data/' + filename, cards)
        resolve({})
    })
}

module.exports = {
    addCard,
    getAllCards,
    removeAll
}