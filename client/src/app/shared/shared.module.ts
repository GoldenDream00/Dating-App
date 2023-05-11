import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    NavComponent,
    TextInputComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
    FileUploadModule,  
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    NavComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    ToastrModule,
    RouterModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    TextInputComponent,
    BsDatepickerModule,
    DatePickerComponent,
    PaginationModule
  ]
})
export class SharedModule { }
