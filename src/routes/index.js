const express = require('express');
const route = express.Router();

route.get('/',  function(req, res){
		res.send('Bienvenidos al API V1 😄 - Test nginx 2023');
	}
);

route.use('/contacto', require('./contactosRouter'));


module.exports = route;