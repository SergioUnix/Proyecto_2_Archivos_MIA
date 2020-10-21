export interface Chat  {
    id_chat?: number;
    mensaje?: string;
    fk_vendedor?: number;
    fk_cliente?: number;
    fk_producto?: number;
    fecha_creacion?: string
}