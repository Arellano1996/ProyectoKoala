import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { Observable } from "rxjs";
import { Letra } from "../interfaces/letras.interfaces";

@Injectable({
    providedIn: 'root'
})
export class LetrasService {
    
    private baseUrl: string = environments.urlServido;
    
    private http = inject(HttpClient);

    getLetraPorId(letraId: string): Observable<Letra>{
        return this.http.get<Letra>(`${ this.baseUrl }/letras/${ letraId }`)
        .pipe( res => {
            return res
        })
    }
}