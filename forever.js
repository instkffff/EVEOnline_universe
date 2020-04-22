const forever = require('forever-monitor')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./systemDB/systems.json')
const db = low(adapter)

var child = new (forever.Monitor)('./map.js',{
	max: 0
})

child.on('exit',function(){
	let count = db.get('count').value()
	if (count === 8285){
		console.log('done')
	} else {
		child.start()
	}
})

child.start()