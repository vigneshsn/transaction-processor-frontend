import { Action } from '@ngrx/store';
import { TransactionStatementResult } from '../models/TransactionStatementResult';

export enum FileUploadActionTypes {
    UploadFile = '[FileUpload Component] uploadFile',
    UploadFileSucceded = '[FileUpload Component] uploadFileSucceded',
    UploadFileFailed = '[FileUpload Component] uploadFileFailed'
}

export class FileUpload implements Action {
    readonly type = FileUploadActionTypes.UploadFile
    constructor(public payload: File) {}
}

export class FileUploadSucceded implements Action {
    readonly type = FileUploadActionTypes.UploadFileSucceded
    constructor(public payload: TransactionStatementResult) {}
}

export class FileUploadFailed implements Action {
    readonly type = FileUploadActionTypes.UploadFileFailed
    constructor(public payload: String) {}
}

export type FileUploadActions = FileUpload | FileUploadSucceded | FileUploadFailed;