export const loadXhr = obj => new Promise((resolve, reject) => {
	const req = new XMLHttpRequest()

	if (!req) {
		throw new Error(`No exist XHR`)
	}

	req.open(obj.method, obj.url)	

	req.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	req.onreadystatechange = () => {
		if (req.readyState === XMLHttpRequest.DONE) {
			if (req.status === 200 || req.status === 201) {
				resolve(req.responseText)			
			} else {
				reject(req.statusText)
			}
		}
	}
	req.send(obj.body || null)
})
