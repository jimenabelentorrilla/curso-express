const express = require('express');

/*importamos los datos*/
const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

  // Middleware
  routerMatematicas.use(express.json());

// Parametros de ruta (o URL)

// Cursos de matematicas
    
routerMatematicas.get('/', (req, res) => {
  /*para hacer el codigo mas conciso en lugar de hacer notacion de punto aca, asignamos directamente matematicas en lugar de infoCurso.matematicas*/
  res.json(matematicas); /**quite JSON.STRINGIFY y modifique send por json*/
});

routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter(curso => curso.tema === tema);

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${tema}.`);
    /*** return res.status(404).end();  Método para enviar una rta. vacia*/
  }

  res.json(resultados); /**quite JSON.STRINGIFY y modifique send por json*/
});

// Si quiero filtrar por dos parametros

routerMatematicas.get('/:tema/:nivel', (req, res) => {
  const tema = req.params.tema;
  const nivel = req.params.nivel;
    
  const resultados = programacion.filter(curso => curso.tema === tema && curso.nivel === nivel);
     
  if (resultados. length === 0){
    return res.status(404).send(`No se encontraron cursos de ${tema} de nivel ${nivel}.`);
    /*** return res.status(404).end();  Método para enviar una rta. vacia*/
  }
    
  if (req.query.ordenar === 'vistas') {
    return res.send(resultados.sort((a, b) => b.vistas - a.vistas)); /**quite JSON.STRINGIFY*/
  }
    res.json(resultados); /**quite JSON.STRINGIFY y modifique send por json*/
});




// POST
routerMatematicas.post('/', (req , res) => {
  let cursoNuevo = req.body; 
    matematicas.push(cursoNuevo); 
    res.json(matematicas);
});



// PUT
routerMatematicas.put('/:id', (req, res) => {
  const cursoActualizado = req.body; 
  const id = req.params.id; 
  
  const indice = matematicas.findIndex(curso => curso.id == id); 
  
  if (indice >= 0) {
    matematicas[indice] = cursoActualizado; 
  }
  res.json(matematicas);
});

//PATCH
routerMatematicas.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id; 
  
  const indice = matematicas.findIndex(curso => curso.id == id);
  
  if (indice >= 0) {
    const cursoAModificar = matematicas[indice];
   
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.json(matematicas); 
});

//DELETE
routerMatematicas.delete('/:id', (req, res) => {
  const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id = id);
    
    if (indice >= 0){
      matematicas.splice(indice, 1); 
    }
    res.json(matematicas);
});




module.exports = routerMatematicas;


