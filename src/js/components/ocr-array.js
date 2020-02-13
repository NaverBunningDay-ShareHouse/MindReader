console.info(`ocr-making array start!`)

import { xhrTest } from './ocr-api.js'

async function ocrtoArray(){
    const data = await xhrTest()
    console.info(`xhrTest()`)
    //console.log(`test`, data)
    return 
}
ocrtoArray()