import { Component, ViewEncapsulation } from '@angular/core';
import {ListCommandsService} from './listCommands.service';

@Component({
  selector: 'list-commands',
  encapsulation: ViewEncapsulation.None,
  template:  require('./listCommands.html')
})

export class ListCommandsComponent {

  dataList: any = {};
  constructor(private listCommands:ListCommandsService) {
    let self = this
    listCommands.getCommands((data) => {
      self.dataList = data
    });

  }
}
