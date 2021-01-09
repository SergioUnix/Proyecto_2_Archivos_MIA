import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';     /// modulo encargado de hacer las peticiones http
import {Producto} from '../modelos/Producto';          //importo tipo interfaz producto
import {Comentario} from '../modelos/Comentario';          //importo tipo interfaz comentario
import {Likes} from '../modelos/Like';
import {Chat} from '../modelos/Chat';
import {DisLikes} from '../modelos/DisLikes';
import {Denuncia} from '../modelos/Denuncia';
import {Categoria} from '../modelos/Categoria';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Creo una variable con mi dirección
 //API_URI = 'http://bfb55d13bb4c.ngrok.io/api';  /// este es para la aplicacion Android
  // API_URI = 'http://192.168.0.4:3000/api';
  
  API_URI = '/api';

constructor(private http: HttpClient) { }

//metodo para pedir productos de todos los usuario...... lo ve el usuario Administrador
getProductosAll(){
  return this.http.get(`${this.API_URI}/producto/perfil_productos/all`);
   }


getProductosOrdenAscendente(id: string){
return this.http.get(`${this.API_URI}/producto/perfil_productos/orden/ascendente/${id}`);
}
getProductosOrdenDescendente(id: string){
  return this.http.get(`${this.API_URI}/producto/perfil_productos/orden/descendente/${id}`);
   }



   getProductosOrdenAscendentePrecio(id: string){
    return this.http.get(`${this.API_URI}/producto/perfil_productos/orden/ascendente/precio/${id}`);
    }
    getProductosOrdenDescendentePrecio(id: string){
      return this.http.get(`${this.API_URI}/producto/perfil_productos/orden/descendente/precio/${id}`);
       }



//metodo para pedir productos que no son del usuario logueado
getProductos(id: string){
return this.http.get(`${this.API_URI}/producto/perfil_productos/${id}`);
 }
//metodo para obtener un producto
getProducto(id: string){
 return this.http.get(`${this.API_URI}/producto/producto_crear/${id}`);

}
//metodo para pedir categorias del sistema
getCategorias(){
  return this.http.get(`${this.API_URI}/categoria/getCategorias`);
   }
   

saveProducto(producto:string,estado:string,fk_usuario:Number,precio:Number,detalle:string,fk_categoria:Number, foto:string , palabras:string, user_compra:Number,photo:File){
  const fd =new FormData();
  fd.append('producto',producto);
  fd.append('estado',estado);
  fd.append('fk_usuario',fk_usuario.toString());
  fd.append('precio',precio.toString());
  fd.append('detalle',detalle);
  fd.append('fk_categoria',fk_categoria.toString());
  fd.append('foto',foto);
  fd.append('palabras',palabras);
  fd.append('user_compra',user_compra.toString());
  fd.append('photo',photo);
  return this.http.post(`${this.API_URI}/producto/producto_crear/`, fd);


}
//Actualizar un Producto  enviando un objeto
saveProducto2(producto:Producto):Observable<Producto> {
  return this.http.post(`${this.API_URI}/producto/producto_crear/con/objeto`, producto);  
  }


//Actualizar un Producto  enviando un objeto
updateProducto(updatedProducto:Producto):Observable<Producto> {
  return this.http.put(`${this.API_URI}/producto/producto_crear/actualizar`, updatedProducto);  
  }

  //Actualizar un Producto Segunda opcion Enviando una Imagen hacia el backend
updateProducto2(id_producto:Number,producto:string,estado:string,fk_usuario:Number,precio:Number,detalle:string,fk_categoria:Number, foto:string , palabras:string, user_compra:Number,photo:File){
  const fd =new FormData();
  fd.append('id_producto',id_producto.toString());
  fd.append('producto',producto);
  fd.append('estado',estado);
  fd.append('fk_usuario',fk_usuario.toString());
  fd.append('precio',precio.toString());
  fd.append('detalle',detalle);
  fd.append('fk_categoria',fk_categoria.toString());
  fd.append('foto',foto);
  fd.append('palabras',palabras);
  fd.append('user_compra',user_compra.toString());
  fd.append('photo',photo);
  return this.http.put(`${this.API_URI}/producto/producto_crear/actualizar/imagen`, fd);  
  }

//metodo para pedir productos que solo halla hecho el usuario logueado
getProductosMIO(id: string){
  return this.http.get(`${this.API_URI}/producto/producto_mio/${id}`);
   }
//metodo para pedir productos que solo halla hecho el usuario logueado
getComentarios(id: string){
  return this.http.get(`${this.API_URI}/producto/detalle/${id}`);
   }

saveComentario(comentario:Comentario){
    return this.http.post(`${this.API_URI}/comentario/detalle/`, comentario);
    }
//contador de likes
getCountLikes(id: string){
   return this.http.get(`${this.API_URI}/likes/detalle/${id}`);
}
//verifico si el usuario tiene un like a ese producto .. dado el id_usuario, id_producto
existLike(id: string,cod:string){
  return this.http.get(`${this.API_URI}/likes/detalle/verifico/${id}/${cod}`);
}

//verifico si el usuario tiene un like a ese producto .. dado el id_usuario, id_producto
existDisLike(id: string,cod:string){
  return this.http.get(`${this.API_URI}/likes/detalle/verifico/dislike/${id}/${cod}`);
}

//contador de Dislikes
getCountDislikes(id: string){
   return this.http.get(`${this.API_URI}/Dislikes/detalle/${id}`);
}

//guardar Like
saveLike(like:Likes){
  return this.http.post(`${this.API_URI}/likes/detalle/crear/`, like);
  }

//metodo para borrar like
deleteLike(id: string,cod:string){
  return this.http.delete(`${this.API_URI}/likes/detalle/eliminar/${id}/${cod}`);
 }
//guardar DisLike
saveDisLike(Dislike:DisLikes){
  return this.http.post(`${this.API_URI}/Dislikes/detalle/crear/`, Dislike);
  }

//metodo para borrar Dislike
deleteDisLike(id: string,cod:string){
  return this.http.delete(`${this.API_URI}/Dislikes/detalle/eliminar/${id}/${cod}`);
 }
 //Obtener todas las denuncias por parte del Administrador
getdenunciasAll(){
  return this.http.get(`${this.API_URI}/denuncias/denuncia-list/obtener/denuncias`);
   }
///Obtengo las denuncias hechas a un solo producto dado el id_producto y el id_usuario...
getdenuncias_un_usuario_producto(pro: string, id: string){
  return this.http.get(`${this.API_URI}/denuncias/dencia-crear/${pro}/${id}`);
}
//guardo una denuncia
saveDenuncia(denuncia:Denuncia){
  return this.http.post(`${this.API_URI}/denuncias/denuncia-crear/crear`, denuncia);
  }
//metodo para borrar Denuncia dado el id_denuncia
deleteDenuncia(id: string){
  return this.http.delete(`${this.API_URI}/denuncias/dencia-crear/${id}`);
 }
///// Actualizar denuncia por parte del administrador
 updateDenuncia(id_denuncia:string,estado:string){
  const fd =new FormData();
  fd.append('id_denuncia',id_denuncia);
  fd.append('estado',estado);
  return this.http.put(`${this.API_URI}/denuncias/denuncia-list/cambiar`, fd);  
  }
//obtengo los chats entre cliente y vendedor
getChats(cli: string,ven:string,pro:string){
  return this.http.get(`${this.API_URI}/chat/chat/${cli}/${ven}/${pro}`);
}

 
//guardar un Chat
saveChat(chat:Chat){
  return this.http.post(`${this.API_URI}/chat/chat/crear/`, chat);
  }


  //Actualizar un Producto solamente el estado del producto
  updateEstado(id_producto:Number,estado:string){
    const fd =new FormData();
    fd.append('id_producto',id_producto.toString());
    fd.append('estado',estado);
    return this.http.put(`${this.API_URI}/producto/perfil/bloquear`, fd);  
    }

//UPDATE a un estado Carrito pero tambien cambio el user_compra para saber que usuario esta haciendo la compra
  updateEstadoCarrito(id_producto:Number,estado:string, user_compra:string){
    const fd =new FormData();
    fd.append('id_producto',id_producto.toString());
    fd.append('estado',estado);
    fd.append('user_compra',user_compra);    
    return this.http.put(`${this.API_URI}/producto/perfil/carrito`, fd);  
    }


//obtengo todos los productos que estan en estado de Carrito por parte de un Usuario
getProductosCarrito(user_compra: string){
  return this.http.get(`${this.API_URI}/producto/carrito/lista/productos/${user_compra}`);
   }




   /// CREO una compra dado el cliente logueado
   saveCompra(fk_cliente:string){
    const fd =new FormData();
    fd.append('fk_cliente',fk_cliente);
    return this.http.post(`${this.API_URI}/carrito/carrito-lista/crear/compra/`, fd);  
  }

  //Obtengo el codigo de la ultima compra ,,,,, esto es para poder hacer los detalles despues
getCodigoUltimaCompra(fk_cliente: string){
  return this.http.get(`${this.API_URI}/carrito/carrito-lista/obtener/ultima/compra/${fk_cliente}`);
   }


   /// CREO un detalle para una compra
   saveDetalle(cantidad:string,fk_producto:string,fk_compra:string){
    const fd =new FormData();
    fd.append('cantidad',cantidad);
    fd.append('fk_producto',fk_producto);
    fd.append('fk_compra',fk_compra);
    return this.http.post(`${this.API_URI}/carrito/carrito-lista/crear/detalle/detalle`, fd);  
  }


  /// Enviar correo hacia un vendedor o un comprador
  enviarCorreoCompraVenta(correo:string,asunto:string,mensaje:string){
    const fd =new FormData();
    fd.append('correo',correo);
    fd.append('asunto',asunto);
    fd.append('mensaje',mensaje);
    return this.http.post(`${this.API_URI}/carrito/carrito-lista/compra/venta/correo/cliente/vendedor`, fd);  
  }


/// Sumar o Restar creditos dato un id_usuario, operacion a realizar y creditos a restar
sumaRestaCreditos(id_usuario:string,operacion:string,valor:string){
  const fd =new FormData();
  fd.append('id_usuario',id_usuario);
  fd.append('operacion',operacion);
  fd.append('valor',valor);
  return this.http.post(`${this.API_URI}/carrito/carrito-lista/suma/resta/creditos`, fd);  
}

//guardo una Categoria
saveCategoria(categoria:Categoria){
  return this.http.post(`${this.API_URI}/categorias/categoria-crear/crear`, categoria);
  }


  //obtengo todas las conversaciones de un vendedor....... dado solo el id_usuario
getConversaciones(id_vendedor: string){
  return this.http.get(`${this.API_URI}/chat/obtener/todos/chats/${id_vendedor}`);
   }


getReporte1Descendente(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/1/obtener/des`);
}


getReporte1(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/1/obtener`);
}
getReporte2(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/2/obtener`);
}

getReporte3(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/3/obtener`);
}
getReporte4(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/4/obtener`);
}
getReporte5(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/5/obtener`);
}
getReporte6(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/6/obtener`);
}
getReporte7(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/7/obtener`);
}

getReporte8(){
  return this.http.get(`${this.API_URI}/reportes/componente/reporte/reporte/8/obtener`);
}




/// Creo una accion por parte del Usuario
saveAccion(descripcion:string,tipo:string,fk_usuario:string){
    const fd =new FormData();
    fd.append('descripcion',descripcion);
    fd.append('tipo',tipo);
    fd.append('fk_usuario',fk_usuario);
    return this.http.post(`${this.API_URI}/bitacora/guardar/accion/en/todo/el/programa`, fd);  
  }







//metodo de actualizar producto
updateProductozzz(id:string, updatedProducto:Producto):Observable<Producto> {
 return this.http.put(`${this.API_URI}/productos/${id}`, updatedProducto);
 
 }

//metodo de actualizar producto
updateProductoCarrito(id:string) {
  return this.http.put(`${this.API_URI}/productos/carrito/${id}`,[]);
      }













}
