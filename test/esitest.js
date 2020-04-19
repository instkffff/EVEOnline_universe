const e = require('../component/esi')

const Router = '/universe/systems/?datasource=tranquility'

async function Systems(router){
	systems = await e.esi(router)
	console.log(systems.data)
}

Systems(Router)
