import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FileuploadComponent } from "./fileupload.component";
import { FileUploadFacade } from "../facade/fileupload.facade";
import { cold, getTestScheduler } from "jasmine-marbles";

describe("FileuploadComponent", () => {
  let component: FileuploadComponent;
  let fixture: ComponentFixture<FileuploadComponent>;
  let fileUploadFacade: FileUploadFacade;
  let fileUploadElement: HTMLElement;

  beforeEach(async(() => {
    const fileUploadFacadeStub = {
      uploadFile: function() {},
      errorMessage$: cold("--x", { x: "Unable to upload file" })
    };

    TestBed.configureTestingModule({
      declarations: [FileuploadComponent],
      providers: [
        {
          provide: FileUploadFacade,
          useValue: fileUploadFacadeStub
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FileuploadComponent);
    fileUploadFacade = TestBed.get(FileUploadFacade);
    component = fixture.componentInstance;
    fileUploadElement = fixture.nativeElement;
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should not show any error message on load", () => {
    fixture.detectChanges();
    const errorMessageElement = fileUploadElement.querySelector("p");
    expect(errorMessageElement).toBeNull();
  });

  it("should invoke uploadFile method on file change", () => {
    const uploadFileSpy = spyOn(fileUploadFacade, "uploadFile");
    const fileToUpload = new File([], "test.csv");
    const mockEvent = {
      target: {
        files: [fileToUpload]
      }
    };
    component.onFileChange(mockEvent);
    expect(uploadFileSpy).toHaveBeenCalledWith(fileToUpload);
  });

  it("should show error message when upload failed", () => {
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();

    const errorMessageElement = fileUploadElement.querySelector("p");
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain("Unable to upload file");
  });
});
