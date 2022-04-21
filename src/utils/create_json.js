const path = require('path');
const fs = require('fs');
const { decode_base64 } = require('./decode_base64');

/**
 * @param  {json} items_file
 * @param  {json} icons_file
 */

function create_json(items_file, icons_file) {
    const items = Object.values(items_file);
    const icons = icons_file;
    // const id = 8;
    // const dataContainer = {};
    // console.log(icons[`${items[id].id}`]);
    // decode_base64(icons[`${items[id].id}`], `${items[id].name.split(' ').join('_')}.png`);
}

module.exports = { create_json };
