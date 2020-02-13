// import './components/test-element.js'
import './components/css-api.js'
import './components/ocr-api.js'
import { loadXhr } from './actions/xhr.js'

// TEST
// document.body.appendChild(document.createElement(`test-element`))

async function xhrTest() {
	const testXhrData = await loadXhr({
		method: `GET`,
		url: `https://www.naver.com`,
	})
  
	console.info(testXhrData)
}

// 가빈형 이거 쓰세염
xhrTest()

console.info(`content-script start!`)
