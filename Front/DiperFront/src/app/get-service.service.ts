import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private http:HttpClient) { }

 // Uses http.get() to load data from a single API endpoint
 getClientes(cliente) {
  return this.http.get('http://diperventa.zapto.org:1337/api/clientes/'+cliente);
}
  getPrecioP(mueble,lista) {
    return this.http.get('http://187.234.58.207:1337/api/piezas/'+mueble+'/'+lista)
}
  getPrecioJ(mueble,lista) {
  return this.http.get('http://187.234.58.207:1337/api/juegos/'+mueble+'/'+lista)
}
}

