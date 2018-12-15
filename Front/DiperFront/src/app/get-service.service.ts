import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Observable, of, throwError} from 'rxjs';
import { tap, map, catchError, retry} from 'rxjs/operators';
import { EntornoModule } from './entorno/entorno.module'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain'})
};
const entorno = new EntornoModule()

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private http:HttpClient) { }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 // Uses http.get() to load data from a single API endpoint
 getAgente(agente) {
   
  return this.http.get('http://'+entorno.host+':'+entorno.puerto+'/api/agente/'+agente);
}

 getClientes(cliente) {
  return this.http.get('http://'+entorno.host+':'+entorno.puerto+'/api/clientes/'+cliente);
}
  getPrecioP(mueble,lista) {
    return this.http.get('http://187.234.58.207:1337/api/piezas/'+mueble+'/'+lista)
}
  getPrecioJ(mueble,lista) {
  return this.http.get('http://187.234.58.207:1337/api/juegos/'+mueble+'/'+lista)
}
  sendMail(mail: string): Observable<string> {
    console.log(mail) 
    return this.http.post<string>('http://'+entorno.host+':'+entorno.puerto+'/mail',mail, httpOptions)
    .pipe(
      tap((mail: string) => console.log('added product w/ id= '+mail)),
      catchError(this.handleError<string>('addProduct'))
    )}
}

