export interface Denuncia  {
    id_denuncia?: number;
    descripcion?: string;
    fecha_creacion?: string;
    fk_admin?: number;
    fk_usuario?: number;
    fk_producto?: number;
    fk_estado?: number
    
}