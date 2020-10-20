export interface Comentario   {
    id_comentario?: number;
    comentario?: string;
    fk_producto?: number;
    fk_usuario?: number;
    fecha_creacion?: string
}