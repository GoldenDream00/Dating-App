import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ErrorsModule { }
