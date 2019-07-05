import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTableComponent } from './report-table.component';
import { FileUploadFacade } from '../facade/fileupload.facade';

describe('ReportTableComponent', () => {
  let component: ReportTableComponent;
  let fixture: ComponentFixture<ReportTableComponent>;

  const fileUploadFacadeStub = {
    uploadFile() {
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTableComponent ],
      providers: [{
        provide: FileUploadFacade,
        useValue: fileUploadFacadeStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
