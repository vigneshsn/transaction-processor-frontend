import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../models/AppState";
import { Observable } from "rxjs";
import { TransactionStatementResult } from "../models/TransactionStatementResult";
import {
  selectErrorMessage,
  selectTransactionStatement
} from "../reducer/fileupload.reducer";
import { FileUpload } from "../actions/fileupload.action";

@Injectable({
  providedIn: "root"
})
export class FileUploadFacade {
  errorMessage$: Observable<String>;
  transactionStatement$: Observable<TransactionStatementResult>;

  constructor(private store: Store<AppState>) {
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.transactionStatement$ = this.store.select(selectTransactionStatement);
  }

  uploadFile(file: File) {
    this.store.dispatch(new FileUpload(file));
  }
}
