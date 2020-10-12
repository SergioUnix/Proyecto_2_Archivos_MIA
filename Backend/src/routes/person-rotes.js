const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

///////////////////////////////////////////////////////////////////////////////      USUARIOS

//para varios registros
router.get('/getUsers', async (req, res) => {
    sql = "select * from usuario";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_usuario": user[0],            
            "nombre": user[1],
            "apellido" : user[2],  
            "correo": user[3] ,     
            "contrasenia": user[4],  
            "confirmacion": user[5],  
            "nac": user[6],  
            "pais": user[7], 
            "foto": user[8],  
            "creditos": user[9],
            "fk_tipo": user[10]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE

router.post('/addUser', async (req, res) => {
    const { username, firstname, lastname } = req.body;

    sql = "insert into person(username,firstname,lastname) values (:username,:firstname,:lastname)";

    await BD.Open(sql, [username, firstname, lastname], true);

    res.status(200).json({
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })
})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { codu, username, firstname, lastname } = req.body;

    sql = "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

    await BD.Open(sql, [username, firstname, lastname,codu], true);

    res.status(200).json({
        "codu": codu,
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })

})


//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "update person set state=0 where codu=:codu";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})

//login solo traigo un registro
    router.get("/api/usuario/:correo/:pass", async (req, res) => {
        const {pass}= req.params;
        const {correo}= req.params;
        
        sql = "select * from usuario where contrasenia = " + pass +"and correo ="+correo;
    
        let result = await BD.Open(sql, [], false);
        Users = [];
    
        result.rows.map(user => {
            let userSchema = {
                "id_usuario": user[0],            
                "nombre": user[1],
                "apellido" : user[2],  
                "correo": user[3] ,     
                "contrasenia": user[4],  
                "confirmacion": user[5],  
                "nac": user[6],  
                "pais": user[7], 
                "foto": user[8],  
                "creditos": user[9],
                "fk_tipo": user[10]
            }
            Users.push(userSchema);
        })
    
        res.json(Users[0]);
    })




///////////////////////////////////////////////////////////////////////////////      PRODUCTOS


//obtengo todos los productos publicados menos el del usuario logueado
router.get('/api/producto/perfil_productos/:id', async (req, res) => {
    const {id}= req.params;
    sql = `Select id_producto,producto,estado,fk_usuario,precio,detalle,fk_categoria, producto.foto, usuario.nombre, usuario.apellido, categoria.categoria     from producto    inner join usuario on producto.fk_usuario= usuario.id_usuario    inner join categoria on producto.fk_categoria = categoria.id_categoria    
    where usuario.id_usuario !=`+id +`and producto.estado ='Sin Bloquear'`; 

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_producto": user[0],            
            "producto": user[1],
            "estado" : user[2],  
            "fk_usuario": user[3] ,     
            "precio": user[4],  
            "detalle": user[5],  
            "fk_categoria": user[6],
            "foto":user[7],
            "nombre": user[8], 
            "apellido": user[9],  
            "categoria": user[10]
        }

        Users.push(userSchema);
    })

    res.send(Users);
})

//obtengo todos los productos publicados menos el del usuario logueado
router.get('/getProducto', async (req, res) => {
    sql = "select id_producto,producto,estado from producto"; 

    let result = await BD.Open(sql, [], false);
  Produc = [];

    result.rows.map(pro => {
        let procucSchema = {
            "id_producto": pro[0],            
            "producto": pro[1],
            "estado" : pro[2],  
            "fk_usuario": pro[3] ,     
            "precio": pro[4],  
            "detalle": pro[5],  
            "fk_categoria": pro[6],
            "foto":pro[7]
        }

      Produc.push(procucSchema);
    })

    res.send(Produc);
})




module.exports = router;