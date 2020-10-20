import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';     /// modulo encargado de hacer las peticiones http
import {Producto} from '../modelos/Producto';          //importo tipo interfaz producto
import {Comentario} from '../modelos/Comentario';          //importo tipo interfaz comentario
import {Likes} from '../modelos/Like';
import {DisLikes} from '../modelos/DisLikes';
import {Denuncia} from '../modelos/Denuncia';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Creo una variable con mi dirección
   //API_URI = 'http://localhost:3000/api';
  API_URI = '/api';

constructor(private http: HttpClient) { }


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
   
//meodo para guardar un producto
saveProducto(producto:Producto){
return this.http.post(`${this.API_URI}/producto/producto_crear/`, producto);
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
//obtengo los chats entre cliente y vendedor
getChats(cli: string,ven:string,pro:string){
  return this.http.get(`${this.API_URI}/chat/chat/${cli}/${ven}/${pro}`);
}

 














//metodo para pedir productos
getProductosVendidos(){
  return this.http.get(`${this.API_URI}/productos/carrito`);
   }


//metodo de borrar
deleteProducto(id: string){
 return this.http.delete(`${this.API_URI}/productos/${id}`);
}
//metodo de actualizar producto
updateProducto(id:string, updatedProducto:Producto):Observable<Producto> {
 return this.http.put(`${this.API_URI}/productos/${id}`, updatedProducto);
 
 }

//metodo de actualizar producto
updateProductoCarrito(id:string) {
  return this.http.put(`${this.API_URI}/productos/carrito/${id}`,[]);
      }
//metodo de actualizar producto
updateProductoCarritoDis(id:string) {
  return this.http.put(`${this.API_URI}/productos/carritoDis/${id}`,[]);
      }
//metodo de actualizar producto
updateProductoCarritoVen(id:string) {
  return this.http.put(`${this.API_URI}/productos/carritoVen/${id}`,[]);
      }        

       //metodo para obtener productos
getBuscar(id: string){
return this.http.get(`${this.API_URI}/productos/buscar/${id}`);
}














}
