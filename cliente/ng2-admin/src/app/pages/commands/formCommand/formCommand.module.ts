import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCommandComponent } from './formCommand.component';
import { routing } from './formCommand.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    NgaModule
  ],
  declarations: [
    FormCommandComponent
  ]
})

export default class FormCommandModule {}
