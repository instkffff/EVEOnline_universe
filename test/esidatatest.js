const esi = require('../component/esi_data.js')

async function a(){
	systems = await esi.systems()
	console.log(systems)
}

a()