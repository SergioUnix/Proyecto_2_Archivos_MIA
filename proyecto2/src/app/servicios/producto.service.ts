import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';     /// modulo encargado de hacer las peticiones http
import {Producto} from '../modelos/Producto';          //importo tipo interfaz producto
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
//metodo para pedir productos
getReporte1(){
return this.http.get(`${this.API_URI}/productos/reporte1/reporte`);
}
//metodo para pedir productos
getReporte2(){
return this.http.get(`${this.API_URI}/productos/reporte2/reporte`);
}

}
