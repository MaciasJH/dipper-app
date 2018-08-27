import { Component, OnInit } from '@angular/core';
import { formatDate } from '../../../node_modules/@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fecha = new Date();
  jsfecha = '';
  selected = 'option2';
  
constructor() { 
    this.jsfecha = formatDate(this.fecha, 'dd/MM/yyyy', 'en-US', '-0500');
  }

  ngOnInit() {
  }

}
