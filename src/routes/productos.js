const express = require ('express');
const router = express.Router();
const mysqlConnection = require('../database');
/*------------------------------------------MODULO HOME-------------------------------------------------- */
router.get('/',(req,res) => {  //peticion get para pedir los productos
    mysqlConnection.query('SELECT * FROM productos  INNER JOIN tipoproducto ON productos.tipo = tipoproducto.idcategoria order by id desc',(err, rows,fields) => {
        if (!err){
            res.json(rows);
        }else{
            console.log (err);
        }
    });
}
);
/*------------------------------------------MODULO PRODUCTO X-------------------------------------------------- */
router.get('/:id',(req, res)=>{ // get pata pedir los productos por id
console.log("modulo de productos");
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM productos WHERE id = ?',[id ], (err,rows, fields)=>{
         if (!err){
            res.json(rows[0]);
        }else{
            console.log (err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM productos WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Producto Eliminado'});
      } else {
        console.log(err);
      }
    });
  });

router.get('/:apiA3/categoria',(req,res) => {  //peticion get para pedir los productos
    mysqlConnection.query('SELECT * FROM tipoproducto',(err, rows,fields) => {
        if (!err){
            res.json(rows);
        }else{
            console.log (err);

        }
    });
}
);

router.get('/apiA3/categoria/:idcategoria',(req, res)=>{ // get pata pedir los productos por id
    console.log("modulo de productos");
        const {idcategoria}=req.params;
        mysqlConnection.query('SELECT * FROM tipoproducto WHERE idcategoria = ?',[idcategoria], (err,rows, fields)=>{
             if (!err){
                res.json(rows[0]);
            }else{
                console.log (err);
            }
        });
    });

    router.delete('/apiA3/categoria/:idcategoria', (req, res) => {
        const { idcategoria } = req.params;
        mysqlConnection.query('DELETE FROM tipoproducto WHERE idcategoria = ?', [idcategoria], (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Categoria Eliminada'});
          } else {
            console.log(err);
          }
        });
      });
      router.post('/apiA3/categoria', function (req, res) {
        var params  = req.body;
        console.log(params);
        mysqlConnection.query('INSERT INTO tipoproducto SET ?', params, function (error, results, fields) {
           if (error) throw error;
           res.end(JSON.stringify(results));
         });
     });


router.get('/apiA3/tipo-poducto/:tipo',(req, res)=>{ // get pata pedir los productos por id
    console.log("modulo de productos");
        const {tipo}=req.params;
        mysqlConnection.query('SELECT * FROM productos  INNER JOIN tipoproducto ON productos.tipo = tipoproducto.idcategoria WHERE tipo = ?',[tipo], (err,rows, fields)=>{
                                                   
             if (!err){
                res.json(rows);
            }else{
                console.log (err);
            }
        });
    });


    router.get('/:apiA3/insumos',(req,res) => {  //peticion get para pedir los productos
        mysqlConnection.query('SELECT * FROM insumos  ',(err, rows,fields) => {
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
            }
        });
    }
    );

    router.get('/apiA3/insumos/:idinsumos',(req, res)=>{ // get pata pedir los productos por id
        console.log("modulo de productos");
            const {idinsumos}=req.params;
            mysqlConnection.query('SELECT * FROM insumos WHERE idinsumos = ?',[idinsumos], (err,rows, fields)=>{
                 if (!err){
                    res.json(rows[0]);
                }else{
                    console.log (err);
                }
            });
        });

    router.delete('/apiA3/insumos/:idinsumos', (req, res) => {
        const { idinsumos } = req.params;
        mysqlConnection.query('DELETE FROM insumos WHERE idinsumos = ?', [idinsumos], (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Insumo Eliminado'});
          } else {
            console.log(err);
          }
        });
      });

      router.post('/apiA3/insumos', function (req, res) {
        var params  = req.body;
        console.log(params);
        mysqlConnection.query('INSERT INTO  insumos SET ?', params, function (error, results, fields) {
           if (error) throw error;
           res.end(JSON.stringify(results));
         });
     });

     router.get('/:apiA4/insumos/insumoproducto',(req,res) => {  //peticion get para pedir los productos

        mysqlConnection.query('SELECT * FROM insumoproducto  INNER JOIN productos ON insumoproducto.idproducto = productos.id INNER JOIN insumos ON insumoproducto.idinsumo=insumos.idinsumos ',(err, rows,fields) => {
          
            //SELECT idproducto, GROUP_CONCAT(idinsumo) FROM insumoproducto  INNER JOIN productos ON insumoproducto.idproducto = productos.id INNER JOIN insumos ON insumoproducto.idinsumo=insumos.idinsumos GROUP BY idproducto 
            //insumos ON insumoproducto.idinsumo=insumos.idinsumos
            //INNER JOIN productos ON insumoproducto.idproducto = productos.id
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
            }
        });
    }
    );

    
    router.get('/:apiA4/insumos/insproconcat',(req,res) => {  //peticion get para pedir los productos

        mysqlConnection.query('SELECT nombre, GROUP_CONCAT(insnombre) pts   FROM delivery2020.insumoproducto JOIN productos ON insumoproducto.idproducto = productos.id JOIN insumos ON insumoproducto.idinsumo=insumos.idinsumos  GROUP BY idproducto',(err, rows,fields) => {
          
    
            if (!err){
                res.json(rows);
            }else{
                console.log (err);
            }
        });
    }
    );


    router.post('/addinsumo-producto', function (req, res) {
        var params  = req.body;
        console.log(params);
        mysqlConnection.query('INSERT INTO insumoproducto SET ?', params, function (error, results, fields) {
           if (error) throw error;
           res.end(JSON.stringify(results));
         });
     });



    router.post('/add', function (req, res) {
        var params  = req.body;
        console.log(params);
        mysqlConnection.query('INSERT INTO productos SET ?', params, function (error, results, fields) {
           if (error) throw error;
           res.end(JSON.stringify(results));
         });
     });

    
    router.put('/editar/:id', (req,res)=>{
    const { nombre, nombre2, precio, descripcion, img, img1, tipo, estado}= req.body;
    const { id }= req.params;
    const query = 'CALL editar_producto (?,?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query,[id, nombre, nombre2, precio, descripcion, img, img1, tipo, estado],(err,rows,filds)=>{

        if (!err){
            res.json({status: 'producto actualizado'});
        } else{
            console.log (err);
        }
      
    });

        
     });

     /*
        router.post('/add',(req,res) => { 

        mysqlConnection.query('INSERT INTO productos SET ?', req.body,
        
        console.log('se ha insertado')
      )
    
    
    
    })
     */

/*------------------------------------------MODULO CARRITO-------------------------------------------------- */


/*-----------------------------------------FIN-MODULO CARRITO-------------------------------------------------- */



module.exports= router;


