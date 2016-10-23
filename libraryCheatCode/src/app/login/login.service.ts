import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  mensage = 'mensaje traido desde el servicio'
  listPerson = [
    {id:1, name:'angel'},
    {id:2, name:'sofia'},
    {id:3, name:'wendy'}];

  updateListPerson(id, name) {
    this.listPerson = this.listPerson.map(item =>
      item.id === id ? {id,name} : item
      ,console.log({id,name})
    )
  }

  constructor() { }

}
