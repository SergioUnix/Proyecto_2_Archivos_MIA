import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Usuario } from 'src/app/modelos/Usuario';     
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {

  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
 

  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }


  usuario: Usuario ={
    id_usuario: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: '',
    confirmacion: '',
    nac: '',
    pais: '',
    foto: '',
    creditos: '',
    fk_tipo: 0
  }



  ngOnInit() {



    const params =this.activatedRoute.snapshot.params;
    console.log(params);
    if(params.contrasenia){        //este params.id me detecta el numero
    
      this.usuariosService.confirmarUsuario(params.correo,params.contrasenia,params.nombre,params.apellido)
      .subscribe(
      res =>{
       //console.log(res)
        this.usuario=res;
        console.log(this.usuario);
        console.log('si existe el usuario dado') 
       },
        err => console.error(err)
      ) 
    }
  
  
  
  
  
  
  }




  setConfirmacion(){    
    this.usuariosService.updateConfirmacion(this.usuario.id_usuario,'Confirmado')
    .subscribe(
    res=> {      
   console.log(res);
   this.setUsuario();
      },
    err=>{
      console.log(err)
    }
    )}







  setUsuario(){    
    this.usuariosService.loginUsuario(this.usuario.correo,this.usuario.contrasenia)
    .subscribe(
    res=> {      
      this.usuario=res;
      this.usuariosService.setSesion(this.usuario);
      this.usuariosService.setlog();
      this.router.navigate(['/perfil']);
       
      },
    err=>{
     
    }
    )}
















}
