let cards = require('../data/cards.json')
const filename = './data/cards.json'
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
        helper.writeJSONFile(filename, cards)
        resolve(newCard)
    })
}

module.exports = {
    addCard,
    getAllCards
}