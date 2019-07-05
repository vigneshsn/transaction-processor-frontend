import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransactionStatementResult } from '../models/TransactionStatementResult';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  transactionStatement$: Observable<TransactionStatementResult>
  
  constructor(private store: Store<AppState>) {
      this.transactionStatement$ = store.pipe(select('fileUpload'), select('transactionStatement'));
  }

  ngOnInit() {
  }

}
