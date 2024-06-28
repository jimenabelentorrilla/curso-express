const express = require('express');

/*importamos los datos*/
const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

// Parametros de ruta (o URL)

// Cursos de matematicas
    
routerMatematicas.get('/', (req, res) => {
  /*para hacer el codigo mas conciso en lugar de hacer notacion de punto aca, asignamos directamente matematicas en lugar de infoCurso.matematicas*/
  res.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter(curso => curso.tema === tema);

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${tema}.`);
  }

  res.send(JSON.stringify(resultados));
});

module.exports = routerMatematicas;


