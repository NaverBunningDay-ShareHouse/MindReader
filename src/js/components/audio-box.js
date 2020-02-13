import { LitElement, html, render } from 'lit-element'
import { css } from 'emotion'

import { xhr, convertBlob } from './css-api.js'

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
				<source id="source" src="" type="audio/mp3"/>
			</audio>
		</div> 
		`
	} 

	firstUpdated() {
		this.playAudio()
	}

	async playAudio() {
		const audioSrc = await xhr(`mijin`, 0, `ShareHouse Fighting!`)		
		const audioBlob = await convertBlob(audioSrc)

		const blobUrl = URL.createObjectURL(audioBlob)
		
		this.querySelector(`#source`).setAttribute(`src`, blobUrl)
		console.dir(this.querySelector(`#audio`))
		
		this.querySelector(`#audio`).pause()
		this.querySelector(`#audio`).load()
		this.querySelector(`#audio`).oncanplaythrough = this.querySelector(`#audio`).play()
	}
}

const style = css``

customElements.define(`audio-box`, AudioBox)
