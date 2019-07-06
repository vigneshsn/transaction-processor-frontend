import { fileUploadReducer, initialState } from "./fileupload.reducer";
import {
  FileUploadSucceded,
  FileUploadFailed
} from "../actions/fileupload.action";
import { TransactionStatementResult } from "../models/TransactionStatementResult";

describe("Fileupload reducer", () => {
  it("should return intial state", () => {
    const result = fileUploadReducer(undefined, { type: null, payload: null });
    expect(result).toBe(initialState);
  });

  it("should return new state on FileUploadSucceded event", () => {
    const data: TransactionStatementResult = {
      duplicates: [
        {
          id: "transaction1",
          iban: "NLABNB23232312",
          description: "test",
          startBalance: 1000,
          endBalance: 900,
          mutation: -100
        }
      ],
      incorrectBalances: [
        {
          id: "transaction2",
          iban: "NLANA23232312",
          description: "test",
          startBalance: 1000,
          endBalance: 900,
          mutation: -100
        }
      ]
    };

    const result = fileUploadReducer(undefined, new FileUploadSucceded(data));
    expect(result.transactionStatement.duplicates[0].id).toBe("transaction1");
  });

  it("should return error message on FileUploadFailed", () => {
    const result = fileUploadReducer(
      undefined,
      new FileUploadFailed("unable to upload")
    );
    expect(result.errorMessage).toBe("unable to upload");
  });
});
