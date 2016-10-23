import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `


    <li *ngFor="let name of login.listPerson">
    <app-input-form
      [nombre]="name.name"

      (update)="onUpdate(name.id,$event.text)"

    ></app-input-form>

    </li>

<li *ngFor="let item of login.listPerson" >{{item.name}}</li>

  `,
  styles: []
})
//
// <input #user type="text" name="user" >
// <input type="text" name="password">
// <button type="submit" (click)="onClick()">Ingresar</button>
export class LoginComponent implements OnInit {

  onClick() {
    debugger;
  }

  onUpdate(id,name) {
    this.login.updateListPerson(id,name);
  }

  constructor(@Inject('login') private login) { }

  ngOnInit() {
  }

}
