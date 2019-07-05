import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [FileuploadComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [FileuploadComponent, HttpClientModule, FormsModule]
})
export class FileuploadModule { }
