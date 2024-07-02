const express = require('express');

/*importamos los datos*/
const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

  // Middleware
  routerProgramacion.use(express.json());

// Parametros de ruta (o URL)

//Cursos de programacion

routerProgramacion.get('/', (req, res) => {
    res.json(programacion); /**quite JSON.STRINGIFY y modifique send por json*/
});

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
      /*** return res.status(404).end();  Método para enviar una rta. vacia*/
    }

    res.json(resultados); /**quite JSON.STRINGIFY y modifique send por json*/
});

// Si quiero filtrar por dos parametros

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
    
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
     
  if (resultados. length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`);
    /*** return res.status(404).end();  Método para enviar una rta. vacia*/
  }
    
  if (req.query.ordenar === 'vistas') {
    return res.send(resultados.sort((a, b) => b.vistas - a.vistas)); /**quite JSON.STRINGIFY*/
  }
    res.json(resultados); /**quite JSON.STRINGIFY y modifique send por json*/
});

  // POST
  routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body; 
    programacion.push(cursoNuevo); 
    res.json(programacion); /**quite JSON.STRINGIFY y modifique send por json*/
  });

  // PUT
  routerProgramacion.put('/:id', (req, res) => { 
    const cursoActualizado = req.body; 
    const id = req.params.id; 
    
    const indice = programacion.findIndex(curso => curso.id == id); 
    
    if (indice >= 0) {
      programacion[indice] = cursoActualizado; 
    }
    res.json(programacion); /**quite JSON.STRINGIFY y modifique send por json*/
  }); 

  //PATCH
  routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id; 
    
    const indice = programacion.findIndex(curso => curso.id == id);
    
    if (indice >= 0) {
	    const cursoAModificar = programacion[indice];
	   
	    Object.assign(cursoAModificar, infoActualizada);
    }
    res.json(programacion); /**quite JSON.STRINGIFY y modifique send por json*/
  });

  //DELETE

  routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id = id);
    
    if (indice >= 0){
      programacion.splice(indice, 1); 
    }
    res.json(programacion); /**quite JSON.STRINGIFY y modifique send por json*/
  });

module.exports = routerProgramacion;