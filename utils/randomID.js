/**
 */

function uniqueID() {
    return Math.floor(Math.random() * Date.now());
}

module.exports = { uniqueID };
