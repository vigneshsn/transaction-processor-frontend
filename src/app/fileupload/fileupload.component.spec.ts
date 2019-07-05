import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadComponent } from './fileupload.component';
import { FileUploadFacade } from '../facade/fileupload.facade';

describe('FileuploadComponent', () => {
  let component: FileuploadComponent;
  let fixture: ComponentFixture<FileuploadComponent>;
  let fileUploadFacade: FileUploadFacade;

  const fileUploadFacadeStub = {
    uploadFile() {
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadComponent ],
      providers: [{
        provide: FileUploadFacade,
        useValue: fileUploadFacadeStub
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FileuploadComponent);
    fileUploadFacade = TestBed.get(FileUploadFacade);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not show any error message on load', () => {
    const fileUploadElement: HTMLElement = fixture.nativeElement;
    const errorMessageElement = fileUploadElement.querySelector('p');
    expect(errorMessageElement).toBeNull();
  });

  it('should invoke uploadFile method on upload', () => {

    const uploadFileSpy = spyOn(fileUploadFacade, 'uploadFile');
    const fileToUpload = new File([], 'test.csv');
    const mockEvent = {
      target: {
        files: [fileToUpload]
      }
    }
    component.onFileChange(mockEvent);
    expect(uploadFileSpy).toHaveBeenCalledWith(fileToUpload);
  });

  // it('should show error message', (done) => {
  //     component.errorMessage$.subscribe((val) => {
  //       expect(val).toEqual('test');
  //       done();
  //     });
  // });

});
