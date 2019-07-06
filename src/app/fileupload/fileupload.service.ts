import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { CONFIG } from "./config";
import { map } from "rxjs/operators";
import { TransactionStatementResult } from "../models/TransactionStatementResult";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FileuploadService {
  constructor(private _httpClient: HttpClient) {}

  uploadFile(fileData: File): Observable<TransactionStatementResult> {
    const formData = new FormData();
    formData.append("file", fileData);
    return this._httpClient
      .post(CONFIG.fileUploadUrl, formData, {
        reportProgress: false
        //observe: 'events'
      })
      .pipe(
        map((response: any) => {
          console.log(JSON.stringify(response));
          return <TransactionStatementResult>response;
        })
      );

    // .pipe(
    //   map((event) => {
    //       switch(event.type) {
    //         case HttpEventType.UploadProgress:
    //           const progress = Math.round(100 * event.loaded / event.total);
    //           return { status: 'progress', message: progress };
    //         case HttpEventType.Response:
    //           return event.body;
    //         default:
    //           return `Unhandled event: ${event.type}`;
    //       }
    //   })
    // )
  }
}
