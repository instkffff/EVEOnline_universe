const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./systemDB/systems.json')
const db = low(adapter)

const parser = require('stellar-classification-parser')

const esi = require('./component/esi_data.js')

db.defaults({ system: [], count: 0 }).write()

async function systemDB(){

	//system
	let systems = await esi.systems()
	let count = db.get('count').value()
	let system_id = systems[count]
	let system_info = await esi.systems_info(system_id)
	let system_name = system_info.name
	let constellation_id = system_info.constellation_id
	let system_position = system_info.position
	let stargates = system_info.stargates
	//star
	let star_id = system_info.star_id
	if(typeof(star_id) == 'undefined'){
		db.get('system').push({
			system_id : system_id,
			system_name : system_name,
			constellation_id : constellation_id,
			system_position : system_position,
			stargates : stargates
		}).write()
		db.update('count', n=> n+1).write()
		console.log(count)
	}else{
		let star_info = await esi.star_info(star_id)
		let star_name = star_info.name
		let luminosity = star_info.luminosity
		let star_spectral_class = star_info.spectral_class
		let spectral = star_spectral_class.replace(/\s/ig,'')
		if(spectral === 'A0IV2'){
			let spectral = 'A0IV'
			let star_spectral_info = parser.parse(spectral,true)
			let star_color = star_spectral_info.data.colour
			db.get('system').push({
				system_id : system_id,
				system_name : system_name,
				constellation_id : constellation_id,
				system_position : system_position,
				stargates : stargates,
				star_id : star_id,
				star_name : star_name,
				star_color : star_color,
				luminosity : luminosity
			}).write()
			db.update('count', n=> n+1).write()
			console.log(count)
		}else{
			let star_spectral_info = parser.parse(spectral,true)
			let star_color = star_spectral_info.data.colour
			db.get('system').push({
				system_id : system_id,
				system_name : system_name,
				constellation_id : constellation_id,
				system_position : system_position,
				stargates : stargates,
				star_id : star_id,
				star_name : star_name,
				star_color : star_color,
				luminosity : luminosity
			}).write()
			db.update('count', n=> n+1).write()
			console.log(count)
		}
	}
}

systemDB()

