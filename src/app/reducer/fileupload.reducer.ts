import { FileUploadActions, FileUploadActionTypes } from '../actions/fileupload.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { TransactionStatementResult } from '../models/TransactionStatementResult';

export const initialState = {
    transactionStatement: {
        duplicates: [],
        incorrectBalance: []
    },
    errorMessage: ''
}


export const selectFileUploadState = createFeatureSelector<AppState>('fileUpload');

export const selectTransactionStatement = createSelector(selectFileUploadState, (state: AppState) => state.transactionStatement);

export const selectErrorMessage = createSelector(selectFileUploadState, (state: AppState) => state.errorMessage);

export function fileUploadReducer(state = initialState, action: FileUploadActions) {

    switch(action.type) {
        case FileUploadActionTypes.UploadFileSucceded: {
            console.log('fileupload succeed');
            return {
                ...state,
                errorMessage: '',
                transactionStatement: action.payload
            }
        }
        case FileUploadActionTypes.UploadFileFailed : {
            console.log('fileupload failed');
            return {
                ...state,
                transactionStatement: initialState.transactionStatement,
                errorMessage: action.payload
            }
        }
        default: {
            return state;
        }
    }
}