import { Component, OnInit } from '@angular/core';
import { formatDate, NgForOf } from '../../../node_modules/@angular/common';
import { FormControl } from '@angular/forms';
import { GetServiceService} from '../get-service.service';
import { isUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fecha = new Date();
  jsfecha = '';
  selected = 'option2';
  visibilidad = false;
  existe = false;
  muebles = [0];
  public clientes;
  
constructor(private _getService: GetServiceService) { 
    this.jsfecha = formatDate(this.fecha, 'dd/MM/yyyy', 'en-US', '-0500');
  }

  ngOnInit() {
console.log('hola tester')

  }

  getClientes(cliente){
    this._getService.getClientes(cliente)
      .subscribe(data => {this.clientes = data },
        err => console.error(err),
        () => this.mostrarCliente()
        );
    
  }

  mostrarCliente(){
    if(this.clientes.length ==0){
      console.log('el cliente no existe')      
      this.visibilidad = false;
      this.existe = false;
    }else{
      this.existe=true;
      console.log('el cliente si existe')      
      console.log(this.clientes[0].Cln_Nombre+" "+this.clientes[0].Cln_Apellido)
      
    }
  }

}
