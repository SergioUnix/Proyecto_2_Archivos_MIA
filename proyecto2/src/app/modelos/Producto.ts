export interface Producto   {
    id_producto?: number;
    producto?: string;
    estado?: string;
    fk_usuario?: number;
    precio?: number;
    detalle?: string;
    fk_categoria?: number,
    foto?: string,
    
    nombre?:string,
    apellido?:string,
    categoria?:string
}