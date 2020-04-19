const esi = require('../component/esi_data.js')
const parser = require('stellar-classification-parser')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function a(){
	systems = await esi.systems()
	console.log(systems)
	await asyncForEach(systems, async(system) =>{
		let system_id = system
		let system_info = await esi.systems_info(system_id)
		let star_id = system_info.star_id
		let star_info = await esi.star_info(star_id)
		let star_spectral_class = star_info.spectral_class
		let star_spectral_info = parser.parse(star_spectral_class,true)
		let stardb = {
			system_info : system_info ,
			star_info : star_info ,
			star_spectral_info : star_spectral_info
		}
		console.log(stardb)
	})

}

a()