import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FileuploadModule } from "./fileupload/fileupload.module";
import { fileUploadReducer } from "./reducer/fileupload.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { FileUploadEffects } from "./effects/fileupload.effects";
import { ReportTableComponent } from "./report-table/report-table.component";

@NgModule({
  declarations: [AppComponent, ReportTableComponent],
  imports: [
    BrowserModule,
    FileuploadModule,
    StoreModule.forRoot({ fileUpload: fileUploadReducer }),
    //StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([FileUploadEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
