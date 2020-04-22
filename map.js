const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./systemDB/systems.json')
const db = low(adapter)

const parser = require('stellar-classification-parser')

const esi = require('./component/esi_data.js')

db.defaults({ system: [], count: 0 }).write()

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function systemDB(){
	try {
		let systems = await esi.systems()
		await asyncForEach(systems, async(system) =>{
			let system_id = system
			let system_info = await esi.systems_info(system_id)
			let star_id = system_info.star_id
			let star_info = await esi.star_info(star_id)
			let star_spectral_class = star_info.spectral_class
			let star_spectral_info = parser.parse(star_spectral_class,true)
			let system_name = system_info.name
			let constellation_id = system_info.constellation_id
			let system_position = system_info.system_position
			let stargates = system_info.stargates
			let star_name = star_info.name
			let star_color = star_spectral_info.data.colour
			let luminosity : star_info.luminosity
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
		})
	} catch(error) {
		console.log(error)
	}	
}

systemDB()