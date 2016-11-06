import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommandsComponent } from './listCommands.component';
import { routing } from './listCommands.routing';
import { NgaModule } from '../../../theme/nga.module';
import {ListCommandsService} from './listCommands.service';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule
  ],
  declarations: [
    ListCommandsComponent
  ],
  providers: [ListCommandsService]
})

export default class ListCommandsModule {}
