import { LitElement, html, render } from 'lit-element'
import { css } from 'emotion'

import { xhrCss } from './css-api.js'

class AudioBox extends LitElement {	
	static get properties() {
		return { 
			test: { type: String},
		}
	}
    
	constructor() {
		super()
        
		this.test = ``
	}
    
	createRenderRoot() {
		return this
	}  

	render() {
		return html`        
		<div class="${style}">
			<audio id="audio" controls>
				<source id="source" src="" type="audio/mpeg"/>
			</audio>
		</div> 
		`
	} 

	firstUpdated() {
		this.playAudio()
	}

	async playAudio() {
		const audioSrc = await xhrCss(`mijin`, `0`, `음성 안내를 시작합니다`)		
		const blobUrl = URL.createObjectURL(audioSrc)
		
		this.querySelector(`#source`).setAttribute(`src`, blobUrl)
    
		// this.saveFile(`test.mp3`, audioSrc)	
    
		this.querySelector(`#audio`).pause()
		this.querySelector(`#audio`).load()		
	}
  
	play() {
		this.querySelector(`#audio`).play()
	}
  
	saveFile(fileName, content) {		

		const objURL = window.URL.createObjectURL(content)
            
		if (window.__Xr_objURL_forCreatingFile__) {
			window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__)
		}
		window.__Xr_objURL_forCreatingFile__ = objURL
 
		const a = document.createElement(`a`)
 
		a.download = fileName
		a.href = objURL
		a.click()
	}
}

const style = css`
audio {
  display: none;
}
`

customElements.define(`audio-box`, AudioBox)
