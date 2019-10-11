const express = require('express')
const router = express.Router()
const card = require('../models/card.model')
const { check, validationResult } = require('express-validator');
const luhn = require("luhn");

/* All cards */
router.get('/getAll', async (req, res) => {
    await card.getAllCards()
        .then(cards => res.json(cards))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new card */
router.post('/add', [
    check('number')
        .isLength({ max: 19 }).withMessage('can be max 19 digits long')
        .bail()
        .matches(/^[0-9]*$/).withMessage('must contain all numbers')
        .bail()
        .custom((value, { req }) => luhn.validate(value)).withMessage('must pass luhn validation'),
    check('balance')
        .isNumeric().withMessage('balance must be a numeric value')
        .bail()
        .custom((value, { req }) => value === 0).withMessage('must be 0 for new cards')
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        await card.addCard(req.body)
        .then(card => res.status(201).json({
            message: `The card has been created`,
            content: card
        }))
        .catch(err => res.status(500).json({ message: err.message }))
    }
)

module.exports = router