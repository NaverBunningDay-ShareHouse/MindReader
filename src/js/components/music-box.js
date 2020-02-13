import { LitElement, html } from 'lit-element'
import { css } from 'emotion'

class MusicBox extends LitElement {	
	static get properties() {
		return { 
			test: { type: String },
		}
	}
    
	constructor() {
		super()
				
		this.pos1 = 0
		this.pos2 = 0 
		this.pos3 = 0 
		this.pos4 = 0
	}
    
	createRenderRoot() {
		return this
	}  

	firstUpdated() {
		this.dragElement(this.querySelector(`#musicBox`))
	}

	render() {
		return html`        
		<div class="${style}">
		<div id="musicBox">
			<div id="musicBoxHeader">클릭시 이동</div>
				테스트 상자
			</div>
		</div>  
		`
	}
	
	dragElement(elmnt) {
		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

		if (document.getElementById(`${elmnt.id }Header`)) {
			document.getElementById(`${elmnt.id }Header`).onmousedown = dragMouseDown
		} else {
			elmnt.onmousedown = dragMouseDown
		}
	
		function dragMouseDown(e) {
			e = e || window.event
			e.preventDefault()

			pos3 = e.clientX
			pos4 = e.clientY
			document.onmouseup = closeDragElement
			document.onmousemove = elementDrag
		}
	
		function elementDrag(e) {
			e = e || window.event
			e.preventDefault()

			pos1 = pos3 - e.clientX
			pos2 = pos4 - e.clientY
			pos3 = e.clientX
			pos4 = e.clientY
			elmnt.style.top = `${elmnt.offsetTop - pos2 }px`
			elmnt.style.left = `${elmnt.offsetLeft - pos1 }px`
		}
	
		function closeDragElement() {
			document.onmouseup = null
			document.onmousemove = null
		}
	}
}

const style = css`
#musicBox {
  position: absolute;
  z-index: 9;
  background-color: white;
  border: 1px solid #d3d3d3;
	text-align: center;
	border-radius: 3px;	
	
	#musicBoxHeader {
		padding: 10px;
		cursor: move;
		z-index: 10;
		background-color: #2196F3;
		color: #fff;
	}
}
`

customElements.define(`music-box`, MusicBox)
