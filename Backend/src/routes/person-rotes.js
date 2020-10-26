const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

const nodemailer = require('nodemailer');
////////////////////////////////////////////////////////////////////////////////////// Para las Fotos


const path = require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    //destination: path.join(__dirname, '../public/uploads'),
    destination: 'uploads/',
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 10000000} //10 megas
}).single('photo');


// RENDER FORM UPLOAD
router.get('/images/upload', (req, res) => {
    res.render('index');
});

router.get('/images', (req, res) => {});
///////////////////////////////////////////////////////////////////////////////      USUARIOS

//login solo traigo un registro
    router.get("/api/usuario/:correo/:pass", async (req, res) => {
        const {pass}= req.params;
        const {correo}= req.params;
        console.log(pass)
        
        sql = "select * from usuario where contrasenia ='" + pass +"' and correo ='"+correo+"' and confirmacion ='Confirmado'";
        console.log(sql)
    
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

//Verifico un usuario si existe.... es como el login para confirmar cuenta....
router.post("/api/usuario/verificar",uploadImage, async (req, res) => {
    const {correo,pass,nombre,apellido}= req.body;
    console.log(req.body)
  
    sql = `select * from usuario where correo='`+correo+ `' and contrasenia='`+pass +`' and nombre='`+nombre+`' and apellido='`+apellido+`'`;
    console.log(sql);
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

//Usuario para recuperar contrasenia .... solamente uso el correo
router.get("/api/usuario/recuperar/recuperar/:correo", async (req, res) => {
    const {correo}= req.params;
    console.log(correo)    
    sql = "select * from usuario where correo ='"+correo+"' and confirmacion ='Confirmado'";
    console.log(sql)

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



//UPDATE ... despues de confirmar con el anterir Cambio el estato del usuario a Confirmado
router.put('/api/usuario/verificar/confirmacion',uploadImage, async (req, res) => {
    const {confirmacion,id_usuario } = req.body;
    console.log(req.body);

    sql = `update usuario set confirmacion=:estado
    where id_usuario=:id_usuario`;
    await BD.Open(sql, [confirmacion,id_usuario], true);

    res.status(200).json({
        "confirmacion":confirmacion
        })

})




// Guardar un Usuario segunda opcion con foto
router.post('/api/usuario/registro/con/foto',uploadImage,async (req, res) => {
    const { nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo} = req.body;
    var transporter = nodemailer.createTransport({
        //host: "smtp.ethereal.email",
        host: "smtp.gmail.com",
        post:587,
        secure:false,
        auth:{
            user: "sergiounixariel@gmail.com",
            pass: "ZMXunix..unix"
        },
    });


    let aux=req.file.path;  
    
   console.log(req.file);
   console.log(req.body);
    
   console.log(req.file.path);
   console.log(aux);

     sql = `insert into usuario (nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo) 
     values(:nombre,:apellido,:correo,:contrasenia,:confirmacion,TO_DATE(:nac,'DD-MM-YYYY'),:pais,:aux,:creditos,:fk_tipo)`


     var mailOptions={
        from: "Remitente",
        to: correo,
        subject: "Correo de Confirmacion",
        text: `Gracias por registrarte!
        Tu cuenta Ha sido Creada, Tu debes loguearte con las siguientes credenciales, puedes activar tu cuenta dirigiendote a la URL dada.
         
        ------------------------
        Correo: '`+correo+`'
        Contraseña: '`+contrasenia+`'
        ------------------------
         
        Por favor hacer click en el enlace para activar tu Cuenta:
        http://localhost:4200/confirmar/`+correo+`/`+contrasenia+`/`+nombre+`/`+apellido
    
    };
     
     await BD.Open(sql, [nombre,apellido,correo,contrasenia,confirmacion,nac,pais,aux,creditos,fk_tipo], true)
     .then ( (res) =>{

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){res.status(500).send(error.message);
            }else{    console.log("Email enviado");  res.status(200).jsonp(req.body);}
            });

         console.log(res); res.statusCode=200;
     },
     (err) =>{console.log(err); res.statusCode=500;}
 ); 
  
     res.json({
        "nombre":nombre,
         "apellido":apellido,
         "correo":correo,
         "contrasenia":contrasenia,
         "confirm,cion":confirmacion,
         "nac":nac,
         "pais":pais,
         "foto":aux,
         "creditos":creditos,
         "fk_tipo":fk_tipo
 
     });





})

// Guardar un Usuario  Primera opcion por medio de un objeto
 router.post('/api/usuario/registro/con/objeto',async (req, res) => {
    const { nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo} = req.body;

    sql = `insert into usuario (nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo) 
    values(:nombre,:apellido,:correo,:contrasenia,:confirmacion,TO_DATE(:nac,'DD-MM-YYYY'),:pais,:foto,:creditos,:fk_tipo)`

         var transporter = nodemailer.createTransport({
        //host: "smtp.ethereal.email",
        host: "smtp.gmail.com",
        post:587,
        secure:false,
        auth:{
            user: "sergiounixariel@gmail.com",
            pass: "ZMXunix..unix"
        },
    });


var mailOptions={
    from: "Remitente",
    to: correo,
    subject: "Correo de Confirmacion",
    text: `Gracias por registrarte!
    Tu cuenta Ha sido Creada, Tu debes loguearte con las siguientes credenciales, puedes activar tu cuenta dirigiendote a la URL dada.
     
    ------------------------
    Correo: '`+correo+`'
    Contraseña: '`+contrasenia+`'
    ------------------------
     
    POr favor hacer click en el enlace para activar tu Cuenta:
    http://localhost:4200/confirmar/`+correo+`/`+contrasenia+`/`+nombre+`/`+apellido

};
     
     await BD.Open(sql, [nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo], true)
     .then ( (res) =>{

    transporter.sendMail(mailOptions, (error,info)=>{
    if(error){res.status(500).send(error.message);
    }else{    console.log("Email enviado");  res.status(200).jsonp(req.body);}
    });

     console.log(res); res.statusCode=200;
     
    },
     (err) =>{console.log(err); res.statusCode=500;}
 ); 


    res.json({
         "nombre":nombre,
         "apellido":apellido,
         "correo":correo,
         "contrasenia":contrasenia,
         "confirm,cion":confirmacion,
         "nac":nac,
         "pais":pais,
         "foto":foto,
         "creditos":creditos,
        "fk_tipo":fk_tipo
        
     });

})







///////////////////////////////////////////////////////////////////////////////      PRODUCTOS



//obtengo todos los productos ,,, lo visualiza el usuario Administrador
router.get('/api/producto/perfil_productos/all', async (req, res) => {
    const {id}= req.params;
    sql = `Select id_producto,producto,estado,fk_usuario,precio,detalle,fk_categoria, producto.foto, producto.palabras, producto.user_compra, usuario.nombre, usuario.apellido, categoria.categoria    
     from producto    inner join usuario on producto.fk_usuario= usuario.id_usuario    inner join categoria on producto.fk_categoria = categoria.id_categoria`; 

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
            "palabras": user[8],
            "user_compra": user[9],
            "nombre": user[10], 
            "apellido": user[11],  
            "categoria": user[12]
        }

        Users.push(userSchema);
    })

    res.send(Users);
})


//obtengo todos los productos publicados menos el del usuario logueado
router.get('/api/producto/perfil_productos/:id', async (req, res) => {
    const {id}= req.params;
    sql = `Select id_producto,producto,estado,fk_usuario,precio,detalle,fk_categoria, producto.foto, producto.palabras, producto.user_compra, usuario.nombre, usuario.apellido, categoria.categoria    
     from producto    inner join usuario on producto.fk_usuario= usuario.id_usuario    inner join categoria on producto.fk_categoria = categoria.id_categoria    
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
            "palabras": user[8],
            "user_compra": user[9],
            "nombre": user[10], 
            "apellido": user[11],  
            "categoria": user[12]
        }

        Users.push(userSchema);
    })

    res.send(Users);
})

//obtengo todos los productos Creados por Mi 
router.get('/api/producto/producto_mio/:id', async (req, res) => {
    const {id}= req.params;
    sql = `Select id_producto,producto,estado,fk_usuario,precio,detalle, palabras,fk_categoria, producto.foto, usuario.nombre, usuario.apellido, categoria.categoria     from producto    inner join usuario on producto.fk_usuario= usuario.id_usuario    inner join categoria on producto.fk_categoria = categoria.id_categoria    
    where usuario.id_usuario =`+id; 

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
            "palabras": user[6],  
            "fk_categoria": user[7],
            "foto":user[8],
            "nombre": user[9], 
            "apellido": user[10],  
            "categoria": user[11]
        }

        Users.push(userSchema);
    })

    res.send(Users);
})

//obtengo solamente un producto en base a su id_producto
router.get('/api/producto/producto_crear/:id', async (req, res) => {
    const {id}= req.params;
    sql = "select * from producto where id_producto ="+id; 

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
            "foto":pro[7],
            "palabras":pro[8],
            "user_compra":pro[9]
        }

      Produc.push(procucSchema);
    })

    res.send(Produc[0]);
})
 

// Guardar un Producto
router.post('/api/producto/producto_crear/',uploadImage,async (req, res) => {
    const { producto,estado,fk_usuario,precio,detalle,fk_categoria,foto, palabras, user_compra } = req.body;

    let aux=req.file.path;  
    
   console.log(req.file);
   console.log(req.body);
    
   console.log(req.file.path);
   console.log(aux);

     sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto, palabras, user_compra) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :aux, :palabras, :user_compra)`
     
     
     await BD.Open(sql, [producto,estado,fk_usuario,precio,detalle,fk_categoria, aux, palabras, user_compra], true)
     .then ( (res) =>{
         console.log(res); res.statusCode=200;
     },
     (err) =>{console.log(err); res.statusCode=500;}
 ); 
  
     res.json({
         "producto":producto,
         "estado":estado,
         "fk_usuario":fk_usuario,
         "precio":precio,
         "detalle":detalle,
         "fk_categoria":fk_categoria,
         "foto": aux,
         "palabras": palabras,
         "user_compra": user_compra
 
     })

})

// Guardar un Producto   Segunda opcion
 router.post('/api/producto/producto_crear/con/objeto',async (req, res) => {
    const { producto,estado,fk_usuario,precio,detalle,fk_categoria,foto, palabras, user_compra } = req.body;

    sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto, palabras, user_compra) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :aux, :palabras, :user_compra)`
     
     
     await BD.Open(sql, [producto,estado,fk_usuario,precio,detalle,fk_categoria, foto, palabras, user_compra], true)
     .then ( (res) =>{
         console.log(res); res.statusCode=200;
     },
     (err) =>{console.log(err); res.statusCode=500;}
 ); 
  
     res.json({
         "producto":producto,
         "estado":estado,
         "fk_usuario":fk_usuario,
         "precio":precio,
         "detalle":detalle,
         "fk_categoria":fk_categoria,
         "foto": foto,
         "palabras": palabras,
         "user_compra": user_compra
 
     })

})

//UPDATE un solo producto
router.put('/api/producto/producto_crear/actualizar', async (req, res) => {
    const {producto,estado,fk_usuario,precio,detalle,fk_categoria, foto,palabras,user_compra,id_producto } = req.body;

    sql = `update producto set producto=:producto,estado=:estado,fk_usuario=:fk_usuario,precio=:precio,detalle=:detalle,fk_categoria=:fk_categoria, foto=:foto,palabras=:palabras,user_compra=:user_compra 
    where id_producto=:id_producto`;
    await BD.Open(sql, [producto,estado,fk_usuario,precio,detalle,fk_categoria, foto,palabras,user_compra,id_producto], true);

    res.status(200).json({
        "producto":producto,
        "estado":estado,
        "fk_usuario":fk_usuario,
        "precio":precio,
        "detalle":detalle,
        "fk_categoria":fk_categoria,
        "foto": foto,
        "palabras": palabras,
        "user_compra": user_compra
    })

})

//UPDATE un solo producto pero mandandole una nueva imagen
router.put('/api/producto/producto_crear/actualizar/imagen',uploadImage, async (req, res) => {
    const {producto,estado,fk_usuario,precio,detalle,fk_categoria, foto,palabras,user_compra,id_producto } = req.body;
    let aux=req.file.path;  
    
    console.log(req.file);
    console.log(req.body);
     
    console.log(req.file.path);
    console.log(aux);

    sql = `update producto set producto=:producto,estado=:estado,fk_usuario=:fk_usuario,precio=:precio,detalle=:detalle,fk_categoria=:fk_categoria, foto=:aux,palabras=:palabras,user_compra=:user_compra 
    where id_producto=:id_producto`;
    await BD.Open(sql, [producto,estado,fk_usuario,precio,detalle,fk_categoria, aux,palabras,user_compra,id_producto], true);

    res.status(200).json({
        "producto":producto,
        "estado":estado,
        "fk_usuario":fk_usuario,
        "precio":precio,
        "detalle":detalle,
        "fk_categoria":fk_categoria,
        "foto": aux,
        "palabras": palabras,
        "user_compra": user_compra
    })

})



//obtengo todos los comentarios de un producto dado su id_producto
router.get('/api/producto/detalle/:id', async (req, res) => {
    const {id}= req.params;
    sql = `select id_comentario,comentario,fk_producto,fk_usuario,fecha_creacion,usuario.nombre,usuario.apellido from comentario
    inner join usuario on comentario.fk_usuario = usuario.id_usuario where fk_producto=`+id; 
  //  sql = `select * from publicacion`;


    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_comentario": user[0],            
            "comentario": user[1],
            "fk_producto": user[2] ,     
            "fk_usuario": user[3] ,     
            "fecha_creacion": user[4],  
            "nombre": user[5],    //nombre de quien fue el que comento 
            "apellido": user[6]   // -- de quien fue el que comento
        }

        Users.push(userSchema);
    })

    res.send(Users);
})









///////////////////////////////////////////////////////////////////////////////      CATEGORIAS
///OBTENGO TODAS LAS CATEGORIAS
//para varios registros
router.get('/api/categoria/getCategorias', async (req, res) => {
    sql = "select * from categoria";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_categoria": user[0],            
            "categoria": user[1]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})





///////////////////////////////////////////////////////////////////////   COMENTARIOS
router.post('/api/comentario/detalle/',async (req, res) => {
    const { comentario,fk_producto,fk_usuario } = req.body;
    console.log(req.body);
   // sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :foto)`
    sql = `insert into comentario (comentario,fk_producto,fk_usuario) values(:comentario,:fk_producto,:fk_usuario)`;

    await BD.Open(sql, [comentario,fk_producto,fk_usuario], true)
    .then ( (res) =>{
        console.log(res); res.statusCode=200;
    },
    (err) =>{console.log(err); res.statusCode=500;}
);

    res.json({
        "comentario":comentario,
        "fk_producto":fk_producto,
        "fk_usuario":fk_usuario
    })
})      




/////////////////////////////////////////////////////////////////////////////    Likes
//obtengo el conteo de likes dado un id_producto
router.get('/api/likes/detalle/:id', async (req, res) => {
    const {id}= req.params;
    sql = `select count(id_likes) as contador from likes where fk_producto=`+id; 
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "contador": user[0]
        }

        Users.push(userSchema);
    })

    res.send(Users[0]);
})
//obtengo el conteo de Dislikes dado un id_producto .....
router.get('/api/Dislikes/detalle/:id', async (req, res) => {
    const {id}= req.params;
    sql = `select count(id_Dislikes) as contador from Dislikes where fk_producto=`+id; 
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "contador": user[0]
        }

        Users.push(userSchema);
    })

    res.send(Users[0]);
})


//Si devuelve un arreglo mayor a 0 significa que el usuario ya hizo like .... verifica like dado el id_usuario
router.get('/api/likes/detalle/verifico/:id/:cod', async (req, res) => {
    const {id}= req.params;
    const {cod}=req.params;
    sql = `select * from likes where fk_usuario=`+id+ `and fk_producto=`+cod; 

    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "id_likes": user[0],
            "fecha_creacion": user[1],
            "fk_producto": user[2],
            "fk_usuario": user[3]
        }

        Users.push(userSchema);
    })

    res.send(Users);
})

//Creo un like 
router.post('/api/likes/detalle/crear',async (req, res) => {
    const { fk_producto,fk_usuario} = req.body;
    console.log(req.body);
   // sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :foto)`
    sql = `insert into likes (fk_producto,fk_usuario) values(:fk_producto,:fk_usuario)`;

    await BD.Open(sql, [fk_producto,fk_usuario], true)
    .then ( (res) =>{
        console.log(res); res.statusCode=200;
    },
    (err) =>{console.log(err); res.statusCode=500;}
);

    res.json({
        "fk_producto":fk_producto,
        "fk_usuario":fk_usuario
    })
})

//Elimino un Like dado el id_usuario y el id_producto
router.delete("/api/likes/detalle/eliminar/:id/:cod", async (req, res) => {
    const { id } = req.params;
    const { cod } = req.params;

    sql = `delete from likes where fk_usuario=`+id +`and fk_producto=`+cod;

    await BD.Open(sql, [], true);

    res.json({ "msg": "like Eliminado " })
})



//Creo un Dislike 
router.post('/api/Dislikes/detalle/crear',async (req, res) => {
    const { fk_producto,fk_usuario} = req.body;
    console.log(req.body);
    sql = `insert into Dislikes (fk_producto,fk_usuario) values(:fk_producto,:fk_usuario)`;

    await BD.Open(sql, [fk_producto,fk_usuario], true)
    .then ( (res) =>{
        console.log(res); res.statusCode=200;
    },
    (err) =>{console.log(err); res.statusCode=500;}
);

    res.json({
        "fk_producto":fk_producto,
        "fk_usuario":fk_usuario
    })
})

//Elimino un DisLike dado el id_usuario y el id_producto
router.delete("/api/Dislikes/detalle/eliminar/:id/:cod", async (req, res) => {
    const { id } = req.params;
    const { cod } = req.params;

    sql = `delete from Dislikes where fk_usuario=`+id +`and fk_producto=`+cod;

    await BD.Open(sql, [], true);

    res.json({ "msg": "Dislike Eliminado " })
})





//////////////////////////////////////////////////////////////////////////////  Denuncias
//Creo una denuncia 
router.post('/api/denuncias/denuncia-crear/crear',async (req, res) => {
    const { descripcion,fk_admin, fk_usuario,fk_producto,fk_estado} = req.body;
    console.log(req.body);
   // sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :foto)`
    sql = `INSERT into denuncia (descripcion,fk_admin, fk_usuario,fk_producto,fk_estado) values(:descripcion,:fk_admin, :fk_usuario,:fk_producto,:fk_estado)`;

    await BD.Open(sql, [descripcion,fk_admin, fk_usuario,fk_producto,fk_estado], true)
    .then ( (res) =>{
        console.log(res); res.statusCode=200;
    },
    (err) =>{console.log(err); res.statusCode=500;}
);

    res.json({
        "descripcion":descripcion,
        "fk_admin":fk_admin,
        "fk_usuario":fk_usuario,
        "fk_producto":fk_producto,
        "fk_estado":fk_estado
    })
})

//obtengo todos las denuncias de un producto dado su id_producto y id_usuario;
router.get('/api/denuncias/dencia-crear/:pro/:id', async (req, res) => {
    const {id}= req.params;
    const {pro}= req.params;
    sql = `
    select denuncia.id_denuncia, denuncia.descripcion, denuncia.fecha_creacion,
    denuncia.fk_admin,denuncia.fk_usuario,denuncia.fk_producto,denuncia.fk_estado, usuario.nombre, producto.producto,estado.estado 
    from denuncia
    inner join usuario on usuario.id_usuario= denuncia.fk_usuario
    inner join producto on producto.id_producto = denuncia.fk_producto
    inner join estado on estado.id_estado = denuncia.fk_estado
    where denuncia.fk_producto =`+pro+ `and denuncia.fk_usuario =`+id; 
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_denuncia": user[0],            
            "descripcion": user[1],
            "fecha_creacion": user[2] ,     
            "fk_admin": user[3] ,     
            "fk_usuario": user[4] ,     
            "fk_producto": user[5] ,     
            "fk_estado": user[6],
            "nombre": user[7],
            "producto": user[8],
            "estado":user[9] 
    }

        Users.push(userSchema);
    })

    res.send(Users);
})


//Eliminar una denuncia
router.delete("/api/denuncias/dencia-crear/:id", async (req, res) => {    
    const { id } = req.params;
    sql = `delete from denuncia where id_denuncia=`+id;
    await BD.Open(sql, [], true);
    res.json({ "msg": "Denuncia Eliminada " })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////     Chat

//obtengo los chats dado el id_cliente , id_vendedor, id_producto
router.get('/api/chat/chat/:cli/:ven/:pro', async (req, res) => {
    const {cli}= req.params;
    const {ven}= req.params;
    const {pro}= req.params;
    sql = `select chat.id_chat,chat.mensaje,chat.fk_vendedor,chat.fk_cliente,chat.fk_producto,chat.fecha_creacion,
    usuario.nombre, usuario.apellido, usuario.foto
    from chat
    inner join usuario on usuario.id_usuario = chat.fk_vendedor 
    where fk_vendedor=`+ven+` and fk_cliente =`+cli+` and fk_producto=`+pro+`  or 
    fk_vendedor=`+cli+` and fk_cliente =`+ven+` and fk_producto=`+pro; 
    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_chat": user[0],            
            "mensaje": user[1],
            "fk_vendedor": user[2] ,     
            "fk_cliente": user[3] ,     
            "fk_producto": user[4] ,     
            "fecha_creacion": user[5] ,     
            "nombre": user[6],
            "apellido": user[7],
            "foto": user[8]
    }

        Users.push(userSchema);
    })

    res.send(Users);
})



//Creo una denuncia 
router.post('/api/chat/chat/crear',async (req, res) => {
    const {mensaje,fk_vendedor,fk_cliente,fk_producto} = req.body;
    console.log(req.body);
   // sql = `insert into producto (producto,estado,fk_usuario,precio,detalle,fk_categoria, foto) values(:producto,:estado,:fk_usuario,:precio,:detalle,:fk_categoria, :foto)`
    sql = `INSERT into chat (mensaje,fk_vendedor,fk_cliente,fk_producto) values(:mensaje,:fk_vendedor,:fk_cliente,:fk_producto)`;

    await BD.Open(sql, [mensaje,fk_vendedor,fk_cliente,fk_producto], true)
    .then ( (res) =>{
        console.log(res); res.statusCode=200;
    },
    (err) =>{console.log(err); res.statusCode=500;}
);

    res.json({
        "mensaje":mensaje,
        "fk_vendedor":fk_vendedor,
        "fk_cliente":fk_cliente,
        "fk_producto":fk_producto
    })
})



////////////////////////////////////////////////////////   Bloquear Productos

//UPDATE un solo producto pero solamente su estado >>> Sin Bloquear, Bloqueado
router.put('/api/producto/perfil/bloquear',uploadImage, async (req, res) => {
    const {estado,id_producto } = req.body;
    console.log(req.body);

    sql = `update producto set estado=:estado
            where id_producto=:id_producto`;
    await BD.Open(sql, [estado,id_producto], true);

    res.status(200).json({
        "estado":estado
        })

})




// Guardar un Usuario segunda opcion con foto
router.post('/api/usuario/registro/recupera/enviar',uploadImage,async (req, res) => {
    const { nombre,apellido,correo,contrasenia,confirmacion,nac,pais,foto,creditos,fk_tipo} = req.body;
    var transporter = nodemailer.createTransport({
        //host: "smtp.ethereal.email",
        host: "smtp.gmail.com",
        post:587,
        secure:false,
        auth:{
            user: "sergiounixariel@gmail.com",
            pass: "ZMXunix..unix"
        },
    });

     var mailOptions={
        from: "Remitente",
        to: correo,
        subject: "Recuperacion Contraseña",
        text: `Has Solicitado la Recuperacion de tu Contraseña!
        Si no haz sido tu puedes Omitir este mensaje, de lo contrario puedes dirigirte a la URL
        y Restablecer tu nueva contraseña
         
        ------------------------
        Correo: '`+correo+`'
        Nombre: '`+nombre+`'
        Apellido: '`+apellido+`'
        ------------------------
         
        Por favor hacer click en el enlace para activar tu Cuenta:
        http://localhost:4200/setear/pass/`+correo+`/`+contrasenia+`/`+nombre+`/`+apellido
    
    };
     

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){res.status(500).send(error.message);
            }else{    console.log("Email de recuperacion enviado");  res.status(200).jsonp(req.body);}
            });







})









module.exports = router;