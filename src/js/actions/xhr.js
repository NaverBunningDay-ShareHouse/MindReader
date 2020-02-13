export const loadXhr = obj => new Promise((resolve, reject) => {
	const req = new XMLHttpRequest()

	if (!req) {
		throw new Error(`No exist XHR`)
	}

	req.open(obj.method, obj.url)	
	req.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	obj.header.forEach(each => {
		req.setRequestHeader(each.key, each.value)
	})

	req.onreadystatechange = () => {
		if (req.readyState === XMLHttpRequest.DONE) {
			if (req.status === 200 || req.status === 201) {
				resolve(req.responseText)			
			} else {
				reject(req.statusText)
			}
		}
	}
	req.send(JSON.stringify(obj.body) || obj.params|| null)
})
