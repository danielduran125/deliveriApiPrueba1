const express = require ('express');

const router = express.Router();

const mysqlConnection = require('../database');




/*------------------------------------------MODULO COMPRAS-------------------------------------------------- */
console.log("modulo de compras");

router.get('/:api/compras',(req,res) => {  //peticion get para pedir los productos
    mysqlConnection.query('SELECT * FROM compras INNER JOIN productos ON compras.fk_idproducto = productos.id',(err, rows,fields) => {
        if (!err){
            res.json(rows);
        }else{
            console.log (err);

        }
    });
}
);

/*----------------------------------------FIN-MODULO COMPRAS----------------------------------------------- */

/*router.post('/:apiA1/carrito',(req,res) => { 

    mysqlConnection.query('INSERT INTO pedido SET ?', req.body,
    
    console.log('se ha insertado')
  )



})*/

//rest api to create a new customer record into mysql database
router.post('/:apiA1/carrito', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO pedido SET ?', params, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });


router.get('/apiA2/pedido/:correo',(req, res)=>{ // get pata pedir los productos por id
    console.log("modulo de productos");
        const {correo}=req.params;
        mysqlConnection.query('SELECT * FROM pedido INNER JOIN productos ON pedido.id = productos.id INNER JOIN estado ON pedido.estado = estado.idestado  WHERE correo= ? order by fecha desc',[correo], (err,rows, fields)=>{
                                                   
             if (!err){
                res.json(rows);
            }else{
                console.log (err);
            }
        });
    });
    



    router.get('/:apiA1/pedidos',(req,res) => {  //peticion get para pedir los productos
        mysqlConnection.query('SELECT * FROM pedido INNER JOIN productos ON pedido.id = productos.id INNER JOIN estado ON pedido.estado = estado.idestado',(err, rows,fields) => {
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
    
            }
        });
    }
    );

    router.get('/:apiA1-no-inner/pedidos-no-inner',(req,res) => {  //peticion get para pedir los productos
        mysqlConnection.query('SELECT * FROM pedido ',(err, rows,fields) => {
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
    
            }
        });
    }
    );

    router.get('/apiA1-no-inner/pedidos-no-inner/:idpedido',(req, res)=>{ // get pata pedir los productos por id
     
            const {idpedido}=req.params;
            mysqlConnection.query('SELECT idpedido,nombre, correo,detalle, fecha,estado, pedido.precio, tiporetiro,(precio*tiporetiro) aumento, ((precio*tiporetiro)+precio) subtotal from pedido WHERE idpedido = ?',[idpedido], (err,rows, fields)=>{
                                                       
                 if (!err){
                    res.json(rows [0]);
                }else{
                    console.log (err);
                }
            });
        });


    
    router.get('/:apiA1/pedidos/pedidoscantidad',(req,res) => {  //peticion get para pedir los productos
        mysqlConnection.query(' SELECT pedido.nombre , count(pedido.nombre) AS total FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY nombre ORDER BY total DESC',(err, rows,fields) => {
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
    
            }
        });
    }
    );

    router.get('/:apiA1/pedidos/c/pedidoscliente',(req,res) => {  //peticion get para pedir los productos
        mysqlConnection.query
('SELECT correo, count(correo) AS total, GROUP_CONCAT(pedido.nombre) AS pts FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY correo ORDER BY total DESC',(err, rows,fields) => {
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
    
            }
        });
    }
    );


    router.get('/apiA8/:fecha',(req, res)=>{ // get pata pedir los productos por id
  
            const {fecha}=req.params;
            mysqlConnection.query
            
('SELECT * FROM delivery2020.pedido INNER JOIN productos ON pedido.id = productos.id WHERE fecha between ? and now() ORDER BY fecha DESC',[fecha], (err,rows, fields)=>{
                                                       
                 if (!err){
                    res.json(rows);
                }else{
                    console.log (err);
                }
            });
        });


        router.get('/apiA7/totalingreso',(req, res)=>{ // get pata pedir los productos por id
  
          
            mysqlConnection.query(' SELECT count(nombre) AS cantidad , SUM(pedido.precio) AS total FROM pedido ', (err,rows, fields)=>{
                                                       
                 if (!err){
                    res.json(rows[0]);
                }else{
                    console.log (err);
                }
            });
        });

        router.get('/apiA9/:idpedido',(req, res)=>{ // get pata pedir los productos por id
            console.log("modulo de productos");
                const {idpedido}=req.params;
                mysqlConnection.query('SELECT * FROM pedido INNER JOIN productos ON pedido.id = productos.id INNER JOIN estado ON pedido.estado = estado.idestado  WHERE idpedido= ?',[idpedido], (err,rows, fields)=>{
                                                           
                     if (!err){
                        res.json(rows[0]);
                    }else{
                        console.log (err);
                    }
                });
            });


            router.get('/apiAEstado/estado-producto/:estado',(req, res)=>{ // get pata pedir los productos por id
                console.log("modulo de productos");
                    const {estado}=req.params;
                    mysqlConnection.query('SELECT * FROM pedido  INNER JOIN estado ON pedido.estado = estado.idestado INNER JOIN productos ON pedido.id = productos.id WHERE pedido.estado = ?',[estado], (err,rows, fields)=>{
                                                               
                         if (!err){
                            res.json(rows);
                        }else{
                            console.log (err);
                        }
                    });
                });

                router.get('/:apiAEst/estado',(req,res) => {  //peticion get para pedir los productos
                    mysqlConnection.query('SELECT * FROM estado',(err, rows,fields) => {
                        if (!err){
                            res.json(rows);
                        }else{
                            console.log (err);
                
                        }
                    });
                });


                router.put('/apiA9editar/:idpedido', (req,res)=>{
                    const {id, nombre, precio, correo, detalle, fecha, estado}= req.body;
                    const { idpedido }= req.params;
                    const query = 'CALL editarEstado (?,?,?,?,?,?,?,?)';
                    mysqlConnection.query(query,[ idpedido,id,  nombre,  precio, correo, detalle, fecha, estado],(err,rows,filds)=>{
                
                        if (!err){
                            res.json({status: 'estado actualizado'});
                        } else{
                            console.log (err);
                        }
                      
                    });
                
                        
                     });

					 
    
    /*

    SELECT count(nombre) AS cantidad , SUM(precio) AS total FROM pedido;

    SELECT pedido.nombre , count(correo) AS total FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY nombre ORDER BY total DESC
    SELECT pedido.id , count(pedido.id) AS total FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY id ORDER BY total DESC

    SELECT pedido.nombre , count(pedido.nombre) AS total FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY nombre ORDER BY total DESC
    
    SELECT correo, count(correo) AS total FROM pedido INNER JOIN productos ON pedido.id = productos.id GROUP BY correo ORDER BY total DESC*/





module.exports= router;

/*router.post('/:apiA1/carrito',(req,res) => { 
    var records = [
        ['', ''],
        ['', '']
        
];

var sql = "INSERT INTO pedido (nombre,precio) VALUES (?,?)";

mysqlConnection.query(sql, [records], function(err, result) {
console.log(result);
});


}) 





router.get('/:apiA1/carrito',(req,res) => {  //peticion get para pedir los productos
    mysqlConnection.query('INSERT INTO pedido (nombre,precio) VALUES (?,?),(?,?)',(err, rows,fields) => {
        if (!err){
            res.json(rows);
        }else{
            console.log (err);

        }
    });
}
);








*/