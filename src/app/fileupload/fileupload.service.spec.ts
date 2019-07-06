import { TestBed } from "@angular/core/testing";

import { FileuploadService } from "./fileupload.service";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("FileuploadService", () => {
  let fileuploadService: FileuploadService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    fileuploadService = TestBed.get(FileuploadService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    const service: FileuploadService = TestBed.get(FileuploadService);
    expect(service).toBeTruthy();
  });
});
