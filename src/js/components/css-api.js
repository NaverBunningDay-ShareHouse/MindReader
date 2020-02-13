import { loadXhr } from '../actions/xhr.js'
import { config } from '../../../config.js'
// mijin : 한국어, 여성 음색
// jinho : 한국어, 남성 음색
// clara : 영어, 여성 음색
// matt : 영어, 남성 음색
// shinji : 일본어, 남성 음색
// meimei : 중국어, 여성 음색
// liangliang : 중국어, 남성 음색
// jose : 스페인어, 남성 음색
// carmen : 스페인어, 여성 음색
console.info(`css-api start!`)
// 가빈이형 작업 공간
async function xhrTest(voiceSpeaker, voiceSpeed, voiceText) {
	const testXhrData = await loadXhr({
		method: `POST`,
		url: `https://naveropenapi.apigw.ntruss.com/voice/v1/tts`,
		params: `speaker=${voiceSpeaker}&speed=${voiceSpeed}&text=${voiceText}`,
		header: [
			{
				key: `X-NCP-APIGW-API-KEY-ID`,
				value: config.cssApiID,
			},
			{
				key: `X-NCP-APIGW-API-KEY`,
				value: config.cssApiKey,
			},
			{
				key: `Content-Type`,
				value: `application/x-www-form-urlencoded`,
			},
		],
	})
	console.info(testXhrData)
}

// 가빈형 이거 쓰세염
//xhrTest(`mijin`, 0, `ShareHouse Fighting!`)
