const express = require('express');
const route = express.Router();

route.get('/', function(req, res, next){
	res.send({msg:'Funcion Get Todos'});
});

route.post('/save', function(req, res, next){

	try {
		let {name} = req.body;
		res.send({msg: `Funcion Guardar Contacto -> ${name}`});
	} catch (error) {
		console.log(error);
	}
});

route.get('/:id', function(req, res, next){
	let {id} = req.params;
	res.send({msg:`Funcion Obtener un Contacto : ${id}`});
});

route.put('/:id', function(req, res, next){
	res.send({msg: 'Funcion editar Contacto'});
});

route.delete('/:id', function(req, res, next){

	res.send({msg: 'Funcion Eliminar un Contacto'});
});

module.exports = route;