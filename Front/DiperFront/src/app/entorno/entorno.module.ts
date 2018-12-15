import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EntornoModule],
  imports: [
    CommonModule
  ]
})
export class EntornoModule {
  host = "diper.no-ip.biz"
  puerto = 1337
 }
