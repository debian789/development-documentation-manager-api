import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'list-commands',
  encapsulation: ViewEncapsulation.None,
  template:  require('./listCommands.html')
})

export class ListCommandsComponent {

  constructor() {}
}
