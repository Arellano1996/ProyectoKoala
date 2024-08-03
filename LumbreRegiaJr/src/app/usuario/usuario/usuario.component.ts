import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Usuario, UsuarioResponse } from '../interfaces/usuario.interfaces';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: ``
})
export class UsuarioComponent extends AppComponent implements OnInit {

  public usuario: Usuario = {
    UsuarioId: "",
    Nombre: "",
    Slug: "",
    CodigoReferido: "",
    Correo: "",
    HistorialDonaciones: null,
    PerfilVerificado: true,
    Referidos: null,
    Socios: null,
    Suscripcion: null,
    Canciones: []
  }

  constructor(private usuarioService: UsuarioService) {
    super();

  }
  ngOnInit(): void {
    this.usuarioService.getUsuarioPorId('160ef76b-ad5a-464a-ad73-514eb1d0c8ca')
    .subscribe( res => {
      this.usuario = res.Usuarios[0]
      console.log( this.usuario )
    })
  }



}
