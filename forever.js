const forever = require('forever-monitor')

var child = new (forever.Monitor)('./map.js',{
	max: 0
})

child.on('exit',function(){
	child.start()
})

child.start()