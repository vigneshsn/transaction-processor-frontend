import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionStatementResult } from '../models/TransactionStatementResult';
import { FileUploadFacade } from '../facade/fileupload.facade';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  transactionStatement$: Observable<TransactionStatementResult>
  
  constructor(private fileUploadFacade: FileUploadFacade) {
      this.transactionStatement$ = fileUploadFacade.transactionStatement$;
  }

  ngOnInit() {
  }

}
