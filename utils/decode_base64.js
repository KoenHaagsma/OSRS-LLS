const fs = require('fs');
const path = require('path');

/**
 * @param  {string} base64str
 * @param  {string} filename
 */

function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'images', `${filename}.png`), buf, (error) => {
        if (error) {
            io.emit('error', { error: `Price data couldn't be retrieved` });
            throw error;
        } else {
            return true;
        }
    });
}

module.exports = { decode_base64 };
