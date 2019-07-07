import { TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "../models/AppState";
import { FileUploadFacade } from "./fileupload.facade";
import { Store } from "@ngrx/store";
import {
  selectErrorMessage,
  selectTransactionStatement
} from "../reducer/fileupload.reducer";
import { FileUpload } from "../actions/fileupload.action";
import { Observable } from "rxjs";
import { cold } from "jasmine-marbles";
import { TransactionStatementResult } from "../models/TransactionStatementResult";

describe("FileUploadFacade testing", () => {
  let store: MockStore<AppState>;
  let fileuploadFacade: FileUploadFacade;
  const transactionStatementResult: TransactionStatementResult = {
    duplicates: [],
    incorrectBalances: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FileUploadFacade, provideMockStore()]
    });

    store = TestBed.get(Store);
    fileuploadFacade = TestBed.get(FileUploadFacade);
    spyOn(store, "dispatch").and.callThrough();
    store.overrideSelector(selectErrorMessage, "unable to upload file");
    store.overrideSelector(
      selectTransactionStatement,
      transactionStatementResult
    );
  });

  it("Should call store dispatch method on calling uploadFile method", () => {
    expect(fileuploadFacade).toBeTruthy();
    const file: File = new File([], "");
    fileuploadFacade.uploadFile(file);
    expect(store.dispatch).toHaveBeenCalledWith(new FileUpload(file));
  });

  it("should work as expected errorMessage$", () => {
    const errorMessageObservableExpected: Observable<String> = cold("(x)", {
      x: "unable to upload file"
    });
    expect(fileuploadFacade.errorMessage$).toBeObservable(
      errorMessageObservableExpected
    );
  });

  it("should work as expected transactionStatement$", () => {
    const transactionStatementObservableExpected: Observable<String> = cold(
      "(x)",
      {
        x: transactionStatementResult
      }
    );
    expect(fileuploadFacade.transactionStatement$).toBeObservable(
      transactionStatementObservableExpected
    );
  });
});
