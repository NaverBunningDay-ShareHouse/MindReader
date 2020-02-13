import { LitElement, html } from 'lit-element'
import { css } from 'emotion'

// 박스 위치 초기화 함수 만들어야함

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
				<div class="music-box-header"></div>
				<div class="music-box-body"></div>
			</div>
		</div>  
		`
	}
	
	dragElement(elmnt) {
		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

		if (document.querySelector(`.music-box-header`)) {
			document.querySelector(`.music-box-header`).onmousedown = dragMouseDown
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
			const top = Number(elmnt.style.top.split(`px`)[0])
			const left = Number(elmnt.style.left.split(`px`)[0])

			pos1 = pos3 - e.clientX
			pos2 = pos4 - e.clientY
			pos3 = e.clientX
			pos4 = e.clientY

			// 화면 밖으로 나가면 초기화 (상하)
			unlimitTop(top)
			unlimitBottom(top)
			unlimitLeft(left)
			unlimitRight(left)
			elmnt.style.top = `${elmnt.offsetTop - pos2 }px`	
			elmnt.style.left = `${elmnt.offsetLeft - pos1 }px`
		}
	
		function closeDragElement() {
			document.onmouseup = null
			document.onmousemove = null
		}

		// 나중에 코드 축약 가능함
		function unlimitTop(top) {
			if (top < 0) {
				elmnt.style.top = `${elmnt.offsetTop + 10 }px`
			}	
		}

		function unlimitBottom(top) {
			if (top > window.innerHeight - 80) {
				elmnt.style.top = `${elmnt.offsetTop - 10 }px`
			}	
		}

		function unlimitLeft(left) {
			if (left < 0) {
				elmnt.style.left = `${elmnt.offsetLeft + 10 }px`
			}	
		}

		function unlimitRight(left) {
			if (left > window.innerWidth - 200) {
				elmnt.style.left = `${elmnt.offsetLeft - 10 }px`
			}	
		}
	}
}

const style = css`
& {
	position: fixed;
	z-index: 10000000;

	#musicBox {	
		position: fixed;	
		right: 50px;
		bottom: 50px;
		z-index: 9;
		background-color: white;
		border: 1px solid #d3d3d3;
		text-align: center;
		border-radius: 3px;	
		
		width: 200px;
		height: 80px;
		display: grid;
		grid-template-rows: 20px 60px;
	
		
		.music-box-header {
			padding: 10px;
			cursor: move;
			z-index: 10;
			background-color: #2196F3;
			color: #fff;
		}
	}
}
`

customElements.define(`music-box`, MusicBox)
