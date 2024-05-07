import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AutentificacionService {

    private baseUrl = 'https://localhost:3000' //Nest
    private haySesion = true;

    constructor(private http: HttpClient) { }

    get currentUser(){
        if(this.haySesion) return undefined;
        else return {
            id: 1,
            nombre: 'Arellano',
            correo: 'arellano9627@gmail.com'
        }
    }
    
    iniciarSesion(correo: string, contrasena: string){
        
    }
    
}
