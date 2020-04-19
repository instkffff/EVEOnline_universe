const e = require('../component/esi')

async function systems(){
	try {
		let router = '/universe/systems/?datasource=tranquility'
		systems = await e.esi(router)
		return systems.data
	} catch(error) {
		console.log(error)
	}
}

async function systems_info(system_id){
	try {
		let router = `/universe/systems/${system_id}/?datasource=tranquility&language=en-us`
		systems_info = await e.esi(router)
		return systems_info.data
	} catch(error) {
		console.log(error)
	}
}

async function star_info(star_id){
	try {
		let router = `/universe/stars/${star_id}/?datasource=tranquility`
		star_info = await e.esi(router)
		return star_info.data
	} catch(error) {
		console.log(error)
	}
}

module.exports.systems = systems
module.exports.systems_info = systems_info
module.exports.star_info = star_info
