import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommandsComponent } from './listCommands.component';
import { routing } from './listCommands.routing';
import { NgaModule } from '../../../theme/nga.module';
import {ListCommands} from './listCommands.service';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule
  ],
  declarations: [
    ListCommandsComponent
  ],
  providers: [ListCommands]
})

export default class ListCommandsModule {}
