import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FileUpload } from '../actions/action';
import { AppState } from '../models/AppState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  
  fileData: File;
  errorMessage$: Observable<String>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.errorMessage$ = this.store.pipe(select('fileUpload'), select('errorMessage'))
  }

  onFileChange($event: any) {
    this.store.dispatch(new FileUpload($event.target.files[0]));
  }
  
}
