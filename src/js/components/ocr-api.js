import { loadXhr } from '../actions/xhr.js'
import { config } from '../../../config.js'
import { ocrToArray } from './ocr-array.js'

console.info(`ocr-api start!`)
export async function xhrTest(imgURL, imgType) {
	const testXhrData = await loadXhr({
		method: `POST`,
		url: config.ocrApiURL,
		header: [
			{
				key: `X-OCR-SECRET`,
				value: config.ocrApiID,
			},
			{
				key: `Content-Type`,
				value: `application/json`,
			},
		],
		body: 
            {
                "images": 
                [
                    {
                        "format": imgType/*받은 이미지파일 형식 설정*/,
                        "name": `imageTest`,
                        "data": null,
                        "url": imgURL,//url은 파라미터로 받아야됨
                    },
                ],
                "lang": `ko`,
                "requestId": `string`,
                "resultType": `string`,
                "timestamp": 0,
                "version": `V1`,
            },
    })
    return ocrToArray(testXhrData)
}//end xhrTest