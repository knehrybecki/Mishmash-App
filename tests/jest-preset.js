const { JSDOM } = require('jsdom')
const { window } = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <head></head>
        <body></body>
    </html>
`)

global.window = window
global.document = window.document

const $ = require('jquery')(window)

global.jQuery = $
global.$ = $