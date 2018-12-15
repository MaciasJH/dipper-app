import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSnackBarModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatSelectModule, MatAutocompleteModule} from '@angular/material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureFieldComponent } from './signature-field/signature-field.component'
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavBarComponent,
    SignatureFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SignaturePadModule,
    MatButtonModule, MatCheckboxModule, LayoutModule, MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatSelectModule, MatAutocompleteModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
