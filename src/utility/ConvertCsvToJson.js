import Papa from 'papaparse'
import uuid from 'uuid/v1'

export function convertCsvFileToJson(file, header=true) {
	return new Promise((resolve, reject) => {
		Papa.parse(file, {
		    header: true,
		    complete: (results) => {
		        resolve(results.data)
		    },
		    error: () => resolve([])
		})
	})
}

export function getJsonFromFiles(files) {
	const promiseArray = []
	files.map(file => promiseArray.push(convertCsvFileToJson(file)))
	return Promise.resolve()
	.then(_ => Promise.all(promiseArray))
	.then(results => {
		let voters = []
		results.map(item => voters = voters.concat(item))
		return voters
	})
}

export function getValidVotersFromData(voters) {
	voters = voters.filter(voter => voter.firstname)
	return voters.map(voter => ({ ...voter, id: uuid() }))
}
