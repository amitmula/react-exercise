var luhn = require("luhn");

function mustBeLuhn10(number) {
    return luhn.validate(number)
}

module.exports = {
    mustBeLuhn10
}