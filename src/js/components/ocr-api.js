import { loadXhr } from '../actions/xhr.js'
import { config } from '../../../config.js'

console.info(`ocr-api start!`)
async function xhrTest(imgURL, imgType) {
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
                "images": [
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
	console.info(testXhrData)
}//end xhrTest

console.info(xhrTest(`https://lineofficial.blogimg.jp/en/imgs/6/d/6dd556f6.png`,`png`).images)
