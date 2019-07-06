import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { FileuploadService } from "../fileupload/fileupload.service";
import { switchMap, map, catchError } from "rxjs/operators";
import {
  FileUploadActionTypes,
  FileUploadSucceded,
  FileUploadFailed
} from "../actions/fileupload.action";
import { Action } from "@ngrx/store";

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions$: Actions,
    private fileUploadService: FileuploadService
  ) {}

  @Effect()
  uploadFile$: Observable<Action> = this.actions$.pipe(
    ofType(FileUploadActionTypes.UploadFile),
    switchMap(action => {
      return this.fileUploadService.uploadFile(action["payload"]).pipe(
        map(data => new FileUploadSucceded(data)),
        catchError(errorResponse =>
          of(new FileUploadFailed(errorResponse.error.message))
        )
      );
    })
  );
}
