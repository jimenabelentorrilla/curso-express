const express = require('express');
const app = express();

/*Importamos el archivo*/
const {infoCursos} = require('./datos/cursos.js');

// Routers


//RouterProgramacion

/** const routerProgramacion = express.Router(); nos crea un router especifico // !! migrado a otro archivo*/
 // Luego con app llamamos al metodo use que le dice que asocie un camino a un router especifico.
 const routerProgramacion = require('./routers/programacion.js');
 app.use('/api/cursos/programacion', routerProgramacion); /*asi asociamos el path con un nombre especifico*/

//RouterMatematicas

/**const routerMatematicas = express.Router(); nos crea un router especifico !! router migrado*/
const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);


// Routing

app.get('/', (req, res) => {
    res.send('Mi primer servidor WAAAAAAAA!!!')
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
}); 
    
const PUERTO = 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});