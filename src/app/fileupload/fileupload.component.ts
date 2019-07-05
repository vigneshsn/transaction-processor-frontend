import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadFacade } from '../facade/fileupload.facade';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  
  fileData: File;
  errorMessage$: Observable<String>;

  constructor(private fileUploadFacade: FileUploadFacade) { 
    this.errorMessage$ = this.fileUploadFacade.errorMessage$;
  }

  ngOnInit() {
  }

  onFileChange($event: any) {
    this.fileUploadFacade.uploadFile($event.target.files[0])
  }

}
