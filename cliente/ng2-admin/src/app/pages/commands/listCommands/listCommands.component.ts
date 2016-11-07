import { Component, ViewEncapsulation } from '@angular/core';
import {CommandsService} from '../commands.service';

@Component({
  selector: 'list-commands',
  encapsulation: ViewEncapsulation.None,
  template:  require('./listCommands.html')
})

export class ListCommandsComponent {

  dataList: any = {};
  constructor(private commandsService:CommandsService) {
    let self = this
    commandsService.getCommands((data) => {
      self.dataList = data
    });

  }
}
