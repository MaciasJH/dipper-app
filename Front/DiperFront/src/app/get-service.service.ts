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
  return this.http.get('http://localhost:1337/api/clientes/'+cliente);
}


}
