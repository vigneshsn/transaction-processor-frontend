import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReportTableComponent } from "./report-table.component";
import { FileUploadFacade } from "../facade/fileupload.facade";
import { cold, getTestScheduler } from "jasmine-marbles";
import { TransactionStatementResult } from "../models/TransactionStatementResult";

describe("ReportTableComponent", () => {
  let component: ReportTableComponent;
  let fixture: ComponentFixture<ReportTableComponent>;
  let reportTableElement: HTMLElement;

  const transactionStatement = {
    duplicates: [],
    incorrectBalances: []
  };

  beforeEach(async(() => {
    const fileUploadFacadeStub = {
      transactionStatement$: cold("--x", { x: transactionStatement })
    };

    TestBed.configureTestingModule({
      declarations: [ReportTableComponent],
      providers: [
        {
          provide: FileUploadFacade,
          useValue: fileUploadFacadeStub
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportTableComponent);
    component = fixture.componentInstance;
    reportTableElement = fixture.nativeElement;
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should not have any duplicates and incorrect transactions onload", () => {
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
    const duplicateTransactionTable = reportTableElement.querySelector(
      "#duplicates-table"
    );
    const incorrectBalanceTransactionTable = reportTableElement.querySelector(
      "#incorrectbalances-table"
    );
    expect(duplicateTransactionTable).toBeDefined();
    expect(incorrectBalanceTransactionTable).toBeDefined();
    expect(
      duplicateTransactionTable.querySelector("td.text-primary").textContent
    ).toBe("No duplicates");
    expect(
      incorrectBalanceTransactionTable.querySelector("td.text-primary")
        .textContent
    ).toBe("No incorrect transactions");
  });

  it("should show duplicate and incorrect balance transactions and default message should not be shown", () => {
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

    component.transactionStatement$ = cold("--x", { x: data });
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
    const duplicateTransactionTable = reportTableElement.querySelector(
      "#duplicates-table"
    );
    const incorrectBalanceTransactionTable = reportTableElement.querySelector(
      "#incorrectbalances-table"
    );
    expect(duplicateTransactionTable).toBeDefined();
    expect(incorrectBalanceTransactionTable).toBeDefined();
    expect(
      duplicateTransactionTable.querySelector("td.text-primary")
    ).toBeNull();
    expect(
      incorrectBalanceTransactionTable.querySelector("td.text-primary")
    ).toBeNull();
    expect(
      duplicateTransactionTable.querySelectorAll("tr.transaction").length
    ).toBe(1);
    expect(
      incorrectBalanceTransactionTable.querySelectorAll("tr.transaction").length
    ).toBe(1);
  });
});
