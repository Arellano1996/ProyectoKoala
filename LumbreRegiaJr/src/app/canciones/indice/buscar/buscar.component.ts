import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: ``
})
export class BuscarComponent {

  @Input()
  terminoDesdeHijo: string = '';

  @Output()
  public termino = new EventEmitter<string>()

  @ViewChild('txtInput') txtInput!: ElementRef;

  emitirTermino( termino: string ): void {
    //Solo llamar cuando el termino haya cambiado
    if(termino === this.terminoDesdeHijo) return
    this.terminoDesdeHijo = termino
    this.termino.emit( this.terminoDesdeHijo )
  }
  
  limpiarInput(txtInput: HTMLInputElement) {
    txtInput.value = '';
    this.termino.emit('')
  }

  limpiarDesdePadre() {
    this.txtInput.nativeElement.value = '';
  }
}