import { Component, OnInit } from '@angular/core';
import { formatDate, NgForOf } from '../../../node_modules/@angular/common';
import { FormControl } from '@angular/forms';
import { GetServiceService} from '../get-service.service';
import { isUndefined, isNumber } from 'util';
import { isEmpty, startWith, map } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';

//let listaMuebles: { id: string, desc:string, cant:number, imp:number }[] = [];

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  fecha = new Date();
  bandera = 1;
  jsfecha = '';
  selected = 'option2';
  visibilidad = false;
  existe = false;
  muebles = [10];
  
  importe: number[]=[];
  importenew: number[]=[];
  datosMueble: { id: number, tipo: string, cant: number, desc:string, imp: string}[]=[]
  datosCliente: { num: number, nombre: string, rfc: string, ubicacion:string, domicilio: string, telef: number, comp: string}[]=[];
  tot: number = 0;
  desctot: number=0;
  iva: number=16;
  public clientes;
  public piezas;
  public juegos;
  public precios;
  public emailPdf;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  
  formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });
  
constructor(private _getService: GetServiceService) {     
    this.jsfecha = formatDate(this.fecha, 'dd/MM/yyyy'/*+' hh:mm a'*/, 'en-US', '-0600');    
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  fillOptions(tipo){
    if(tipo=="Pieza"){
      this.options=this.getValues(this.piezas,'Pzs_Descripcion')
   
    }
    else{
      this.options=this.getValues(this.juegos,'Jgs_Descripcion')
     

    }
  }

  getClientes(cliente){
    this._getService.getClientes(cliente)
      .subscribe(data => {this.clientes = data },
        err => console.error(err),
        () => this.mostrarCliente()
        );

  }
  calcImporte(impn:number, t){
    this.importenew[t] =impn;
    this.tot=0;
    for (let index = 0; index < this.importenew.length; index++) {
     
      if(!isNaN(Number(this.importenew[index])) && Number(this.importenew[index])!=0){
     
      this.tot=Number(Number(this.tot) + Number(this.importenew[index]))
      }
}
  }


  calcTodo(indice, tipo, cantidad, descripcion, importe){
    this.calcImporte(importe, indice);    
    importe=this.formatter.format(importe)
    if(indice+1 > this.datosMueble.length && descripcion!=undefined && !isNaN(Number(this.importenew[indice])) && Number(this.importenew[indice])!=0){
     
      this.datosMueble.push({"id":indice, "tipo":tipo, "cant":cantidad, "desc":descripcion, "imp":importe})
    }
    else if(indice<this.datosMueble.length && descripcion!=undefined){
      this.datosMueble[indice].id=indice;
      this.datosMueble[indice].tipo=tipo;
      this.datosMueble[indice].cant=cantidad;
      this.datosMueble[indice].desc=descripcion;
      this.datosMueble[indice].imp=importe;
    }
  }


  mostrarCliente(){
    if(this.clientes.length ==0){
      console.log('el cliente no existe')      
      this.visibilidad = false;
      this.existe = false;
    }else{
      this.existe=true;
      console.log('el cliente si existe')    
      console.log(this.clientes.cliente[0].Cln_Nombre+" "+this.clientes.cliente[0].Cln_Apellido)
      if(this.datosCliente.length==0){
       
        this.datosCliente.push({"num":this.clientes.cliente[0].Cln_Clave, "nombre": this.clientes.cliente[0].Cln_Nombre +" "+ this.clientes.cliente[0].Cln_Apellido, rfc: this.clientes.cliente[0].Cln_RFC, "ubicacion":this.clientes.cliente[0].Cln_Ciudad+ ", "+this.clientes.cliente[0].Cln_Estado+ ", "+this.clientes.cliente[0].Cln_Pais
        , "domicilio":this.clientes.cliente[0].Cln_Direccion+" "+ this.clientes.cliente[0].Cln_NoExterior +" Col: "+this.clientes.cliente[0].Cln_Col+" CP: "+this.clientes.cliente[0].Cln_CP, telef: this.clientes.cliente[0].Cln_TelCom, comp: this.clientes.cliente[0].Cln_Compania})
      }else{
      
        this.datosCliente.pop();
      this.datosCliente.push({"num":this.clientes.cliente[0].Cln_Clave, "nombre": this.clientes.cliente[0].Cln_Nombre +" "+ this.clientes.cliente[0].Cln_Apellido, rfc: this.clientes.cliente[0].Cln_RFC, "ubicacion":this.clientes.cliente[0].Cln_Ciudad+ ", "+this.clientes.cliente[0].Cln_Estado+ ", "+this.clientes.cliente[0].Cln_Pais
      , "domicilio":this.clientes.cliente[0].Cln_Direccion+" "+ this.clientes.cliente[0].Cln_NoExterior +" Col: "+this.clientes.cliente[0].Cln_Col+" CP: "+this.clientes.cliente[0].Cln_CP, telef: this.clientes.cliente[0].Cln_TelCom, comp: this.clientes.cliente[0].Cln_Compania})
    }
      this.piezas=this.clientes.descpiezas;
      this.juegos=this.clientes.descjuegos;
      
    }
  }

  getMuebles(idee){
    
  }
//falta revisar si es pieza o juego
  getPrecio(idmueble, lista, ttt, tipo){
  
    

    if (tipo=="Pieza") {
      this.importe[ttt]=this.getObjects(this.piezas,'Pzs_Descripcion',idmueble)[0].Lpp_PrecioUnitario
      
    }
    else{
      this.importe[ttt]=this.getObjects(this.juegos,'Jgs_Descripcion',idmueble)[0].Lpj_PrecioUnitario
    }
 

  }
//return an array of values that match on a certain key
getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(this.getValues(obj[i], key));
      } else if (i == key) {
          objects.push(obj[i]);
      }
  }
  return objects;
}
//return an array of objects according to key, value, or key and value matching
getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(this.getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
      } else if (obj[i] == val && key == ''){
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }
  }
  return objects;
}
  setCantidad(num, ind){
    //listaMuebles[ind].cant=num;
    //console.log(listaMuebles[ind].cant);
  }
  mostrarPrecios(id, t){
    for (let index = 0; index < this.muebles.length; index++) {
      
    }
  }

  genPDF(){
      var columnsMuebles = ["Numero", "Tipo", "Cantidad", "Descripcion", "Importe"];
      var rowsMuebles = [];  
      var columnsCliente1 = ["Clave", "Nombre", "RFC", "Compañia"];
      var rowsCliente1 = []; 
      var columnsCliente2 = ["Ubicacion", "Domicilio", "Telefono"];
      var rowsCliente2 = [];  
      this.datosMueble.forEach(function (teste){
        rowsMuebles.push([teste.id+1, teste.tipo, teste.cant, teste.desc, teste.imp])
      })
      this.datosCliente.forEach(function (teste){
        rowsCliente1.push([teste.num, teste.nombre, teste.rfc, teste.comp])      
        rowsCliente2.push([teste.ubicacion, teste.domicilio, teste.telef])
      })

      var pdf = new jsPDF('p', 'pt'); // A4 size page of PDF  
      var position = 0;  
      var imgData= 'data:image/jpeg;base64,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'
      pdf.addImage(imgData, 'JPEG', 30, 10, 698/4, 219/4);
      pdf.setFontSize(12)
      pdf.text('Fecha: ' + this.jsfecha, 410, 40)
     // pdf.addImage(img, 'PNG', 15, 40, 180, 160);
      pdf.setFontSize(18);
      pdf.text('Datos del Cliente', 30, 96);
      pdf.setFontSize(11);
      pdf.autoTable(columnsCliente1, rowsCliente1, {theme: 'grid', startY: 112})
      pdf.autoTable(columnsCliente2, rowsCliente2, {theme: 'grid', startY: pdf.autoTable.previous.finalY + 10})      
      pdf.setFontSize(18);
      pdf.text('Pedido', 30, pdf.autoTable.previous.finalY + 40);
      pdf.setFontSize(11);
      pdf.autoTable(columnsMuebles, rowsMuebles, {startY: pdf.autoTable.previous.finalY + 48})
      pdf.text('Importe Total: ',340 ,pdf.autoTable.previous.finalY + 30);
      pdf.text(this.formatter.format(this.tot), 540, pdf.autoTable.previous.finalY + 30, 'right')
      this.desctot=this.tot;
      this.desctot=this.desctot-(this.desctot*this.clientes.cliente[0].Cln_DescuentoPactado)/100
      this.desctot=this.desctot-(this.desctot*this.clientes.cliente[0].Cln_DescuentoProntoPago)/100
      this.desctot=this.desctot-(this.desctot*this.clientes.cliente[0].Cln_DescuentoRecogerOrigen)/100
      this.desctot=this.desctot-(this.desctot*this.clientes.cliente[0].Cln_DescuentoOpcional)/100
      
      pdf.text(this.formatter.format(this.tot-this.desctot), 540, pdf.autoTable.previous.finalY + 44, 'right')
      pdf.text('Descuento: ',340 ,pdf.autoTable.previous.finalY + 44);
      pdf.text(this.formatter.format(this.desctot), 540, pdf.autoTable.previous.finalY + 58, 'right')
      pdf.text('Total con Descuento: ',340 ,pdf.autoTable.previous.finalY + 58);
      pdf.text(this.formatter.format((this.desctot*this.iva)/100), 540, pdf.autoTable.previous.finalY + 72, 'right')
      pdf.text('IVA: ',340 ,pdf.autoTable.previous.finalY + 72);
      pdf.text(this.formatter.format(this.desctot+(this.desctot*this.iva)/100), 540, pdf.autoTable.previous.finalY + 86, 'right')
      pdf.text('Total con IVA: ',340 ,pdf.autoTable.previous.finalY + 84);
      pdf.text('Observaciones: '+ this.clientes.cliente[0].Cln_Observaciones, 30, pdf.autoTable.previous.finalY + 126)
      pdf.save('Venta.pdf'); // Generated PDF         
      
      

  //console.log(dataurl);
  //console.log(emailPdf);
      
  }
}
