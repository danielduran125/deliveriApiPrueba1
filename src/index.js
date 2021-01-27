const express = require('express'), 
      morgan = require('morgan');
const app = express();
const cors = require('cors');



// configuraciones
app.set('port', process.env.PORT|| 3000);
app.use(cors());


// midlewares fucnciones antes de procesar algo
app.use(morgan('dev'));
app.use (express.json());
// rutas


app.use(require('./routes/productos.js'));
app.use(require('./routes/compras.js'));
app.use(require('./routes/perfil.js'));



//empezando servidor
app.listen(app.get ('port'), ()=> {
    console.log('servidor en el puerto', app.get('port'));
});


