import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrearLetraCancion } from '../../canciones/interfaces/crear.cancion.interfaces';
import { LetrasService } from '../service/letras.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatearLetraService } from '../../canciones/services/formatear-letra.service';
import { RespuestaError } from '../../shared/interfaces/respuesta.interface';
import { EditarLetra } from '../interfaces/letras.interfaces';

@Component({
  selector: 'app-letra-editar',
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {
  
  private fb = inject(FormBuilder)
  private letraService = inject(LetrasService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  uuid: string = ''
  cancionId: string = ''

  posicionMenu: number = 0;
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: 'A' };

  public formularioEditarLetra: FormGroup = this.fb.group({
    Letra: ['', []],
  })

  constructor() {
    this.uuid = this.route.snapshot.paramMap.get('id')!

    //console.log( this.uuid )
    this.letraService.getLetraPorId(this.uuid)
    .subscribe( res => {
      //console.log( res )
      
      this.cancion = JSON.parse(res.Letra)
      this.cancionId = res.Cancion!.CancionId
      //console.log( this.cancion )
      
    })
    
  }
  //Metodo es llamado desde el elemento menu-crear-cancion
  recibirPosicionMenu(index: number){
    this.posicionMenu = index;
  }

  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioEditarLetra.controls[field].errors 
    && this.formularioEditarLetra.controls[field].touched
  }

  //Metodo es llamado desde el elemnto textarea-letra-crear-cancion
  recibirCancion(cancion: CrearLetraCancion){
    this.cancion = cancion
  }

  //Método al hacer submit a nuestro formulario
  onSave(){
    //console.log( this.cancion)
    if(this.cancion.Lineas.length > 0){
      const cancionSerializada = JSON.stringify(this.cancion)
      this.formularioEditarLetra.controls['Letra'].patchValue( cancionSerializada )
    }
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioEditarLetra.invalid ) {
      this.formularioEditarLetra.markAllAsTouched()
      return
    }

    //console.log( this.formularioEditarLetra.controls['Letra'].value )
    
    const letraEditar: EditarLetra = {
      Letra: this.formularioEditarLetra.controls['Letra'].value,
      Tono: this.cancion.Tono
    }

    this.letraService.patchEditarLetraPorId(this.uuid, letraEditar ).subscribe({
      next: res => {
        //console.log(res)
        this.router.navigate([`/canciones/${ this.cancionId }`])
      },
      error: err => {
        console.log( err.error as RespuestaError ) 
      }
    })


  }
}
