export interface Usuario   {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    contrasenia?: string;
    confirmacion?: string;
    nac?: string;
    pais?: string;
    foto?: string;
    creditos?: string;
    fk_tipo?: number
}