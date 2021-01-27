const express = require ('express');

const router = express.Router();

const mysqlConnection = require('../database');



router.get('/:apiA2/perfil',(req,res) => {  
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM perfil_usuario',[id ],(err, rows,fields) => {
        if (!err){
            res.json(rows);
        }else{
            console.log (err);

        }
    });
}
);


router.get('/apiA2PerfilU/:idcorreousuario',(req, res)=>{ // get pata pedir los productos por id
    console.log("modulo de productos");
        const {idcorreousuario}=req.params;
        mysqlConnection.query('SELECT * FROM perfil_usuario   WHERE idcorreousuario= ? ',[idcorreousuario], (err,rows, fields)=>{
                                                   
             if (!err){
                res.json(rows[0]);
            }else{
                console.log (err);
            }
        });
    });


router.post('/:apiA2/perfil', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO perfil_usuario SET ?', params, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

   router.get('/apiusuariosperiodo/:fecha',(req, res)=>{ // get pata pedir los productos por id
  
            const {fecha}=req.params;
            mysqlConnection.query
            
('SELECT * FROM delivery2020.perfil_usuario WHERE fecha between ? and now() ORDER BY fecha DESC',[fecha], (err,rows, fields)=>{
                                                       
                 if (!err){
                    res.json(rows);
                }else{
                    console.log (err);
                }
            });
        });

       
        
       
  
        
        
       

           router.put('/editarp/perfil/:idperfil_usuario', (req,res)=>{
    const { nombre, telefono ,  direccion , otrodato, idcorreousuario, img, fecha }= req.body;
    const { idperfil_usuario }= req.params;
    const query = 'CALL editarPerfil (?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query,[idperfil_usuario , nombre,  telefono , direccion ,  otrodato ,idcorreousuario, img, fecha ],(err,rows,filds)=>{

        if (!err){
            res.json({status: 'perfil actualizado'});
        } else{
            console.log (err);
        }
      
    });

        
     });


module.exports= router;

/*
router.post('/:apiA2/perfil',(req,res) => { 

    mysqlConnection.query('INSERT INTO perfil_usuario SET ?', req.body,
    
    console.log('se ha insertado')
  )



})

*/