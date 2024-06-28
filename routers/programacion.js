const express = require('express');

/*importamos los datos*/
const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

// Parametros de ruta (o URL)

//Cursos de programacion

routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion ));
});

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
    }

    res.send(JSON.stringify(resultados));
});

// Si quiero filtrar por dos parametros

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
    
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
     
  if (resultados. length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`)
  }
    
  if (req.query.ordenar === 'vistas') {
    return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
  }
    res.send(JSON.stringify(resultados));

  res.send(JSON.stringify(resultados));
});

module.exports = routerProgramacion;