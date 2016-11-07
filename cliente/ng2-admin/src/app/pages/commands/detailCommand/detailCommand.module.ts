import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCommandComponent } from './detailCommand.component';
import { routing } from './detailCommand.routing';
import { NgaModule } from '../../../theme/nga.module';

import {CommandsService} from '../commands.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule
  ],
  declarations: [
    DetailCommandComponent
  ],
  providers: [CommandsService]
})

export default class DetailCommandModule {}
