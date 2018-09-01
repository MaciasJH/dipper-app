import { Component, OnInit } from '@angular/core';
import { formatDate } from '../../../node_modules/@angular/common';
import { FormControl } from '@angular/forms';


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
  muebles = [0];
constructor() { 
    this.jsfecha = formatDate(this.fecha, 'dd/MM/yyyy', 'en-US', '-0500');
  }

  ngOnInit() {
  }

  mostrarCliente(){
    this.visibilidad=true;
  }

}
