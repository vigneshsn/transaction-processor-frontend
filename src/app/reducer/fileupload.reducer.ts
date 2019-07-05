import { FileUploadActions, FileUploadActionTypes } from '../actions/action';

export const initialState = {
    transactionStatement: {
        duplicates: [],
        incorrectBalance: []
    },
    errorMessage: ''
}

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
                errorMessage: action.payload
            }
        }
        default: {
            return state;
        }
    }
}