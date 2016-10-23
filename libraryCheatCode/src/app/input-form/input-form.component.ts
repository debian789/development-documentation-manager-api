import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  template: `
nombre:   {{nombre}}
<input type="text"
  #myInput
  [(ngModel)]="nombre"
  [ngClass]="{mouse:isMouseDown}"
  (mousedown)="isMouseDown = true"
>
<button (click)='update.emit({text:nombre})'></button>

  `,
  styles: [`
    :host{
      display: flex;
      flex-direction: column;
    }

    .mouse{
      border: 2px solid green;
    }
    input:focus{
      outline: none;
      font-weight:bold;
    }

    button{
      border: 1px solid red;
    }
  `]
})
export class InputFormComponent implements OnInit {
  save(value) {
    console.log(value)
  }

  isMouseDown;

  @Input() nombre;
  @Output() update = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
