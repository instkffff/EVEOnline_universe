const axios = require('axios')

const instance = axios.create({
	baseURL: 'https://esi.evetech.net/latest',
	timeout: 1000	
})

async function esi(router){
	return new Promise((resolve,reject) => {
		instance.get(router).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	}) 
}

module.exports.esi = esi






