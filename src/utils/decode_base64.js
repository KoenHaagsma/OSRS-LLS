const fs = require('fs');
const path = require('path');

/**
 * @param  {string} base64str
 * @param  {string} filename
 */

function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');
    console.log(__dirname);
    fs.writeFileSync(path.join(__dirname, filename), buf, (error) => {
        if (error) {
            throw error;
        } else {
            return true;
        }
    });
}

module.exports = { decode_base64 };
