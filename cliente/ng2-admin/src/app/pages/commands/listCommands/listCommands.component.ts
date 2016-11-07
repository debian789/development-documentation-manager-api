import { Component, ViewEncapsulation } from '@angular/core';
import {CommandsService} from '../commands.service';

@Component({
  selector: 'list-commands',
  encapsulation: ViewEncapsulation.None,
  template:  require('./listCommands.html')
})

export class ListCommandsComponent {

  dataList: any = {};
  constructor(private listCommands:CommandsService) {
    let self = this
    listCommands.getCommands((data) => {
      self.dataList = data
    });

  }
}
