export interface Producto   {
    id_producto?: number;
    producto?: string;
    estado?: string;
    fk_usuario?: number;
    precio?: number;
    detalle?: string;
    fk_categoria?: Number,
    foto?: string,
    palabras?: string,
    user_compra?: Number
}