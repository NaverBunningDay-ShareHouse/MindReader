const path = require(`path`)
const fs = require(`fs`)

const srcPath = path.resolve(__dirname, `./src/js/`)
const distPath = path.resolve(__dirname, `./dist/js/`)

function getEntries(dir, results) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, list) => {
			if (err) {
				reject(err)
			}
			let i = 0;
			(function next() {
				let file = list[i++]
				if (!file) {
					return resolve(results
						.filter(item => item.match && item.match(/.*\.js$/))
						.map(item => ({
							name: item.substring(srcPath.length + 1, item.length - 3),
							path: item,
						})).reduce((memo, item) => {
							memo[item.name] = item.path
							return memo
						}, {}),

					)
				}
				file = `${dir}/${file}`
				fs.stat(file, (err, stat) => {
					if (stat && stat.isDirectory()) {
						getEntries(file, results).then(res => {
							results = results.concat(res)
							next()
						})
					} else {
						results.push(file)
						next()
					}
				})
			}())
		})
	})
}

module.exports = async function(mode = `production`) {
	const jsFiles = await getEntries(srcPath, [])
	return {
		mode: mode,
		resolve: {
			alias: {
				"@": srcPath,
			},
		},
		plugins: [],
		entry: jsFiles,
		output: {
			path: distPath,
			filename: `[name].js`,
		},
	}
}
