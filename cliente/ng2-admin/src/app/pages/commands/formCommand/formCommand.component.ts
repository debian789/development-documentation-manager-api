import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../../theme/validators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'form-command',
  encapsulation: ViewEncapsulation.None,
  template: require('./formCommand.html'),
})
export class FormCommandComponent {

  public form:FormGroup;
  public title:AbstractControl;
  public is_edit:AbstractControl;
  public is_public:AbstractControl;

  public submitted:boolean = false;



  public onSubmit(values:Object):void {
    this.submitted = true;
    debugger
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      firstName: {
        title: 'First Name',
        type: 'string'
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(fb:FormBuilder) {

let data = [
  {
    "id": 1,
    "firstName": "Mark",
    "lastName": "Otto",
    "username": "@mdo",
    "email": "mdo@gmail.com",
    "age": "28"
  },
  {
    "id": 2,
    "firstName": "Jacob",
    "lastName": "Thornton",
    "username": "@fat",
    "email": "fat@yandex.ru",
    "age": "45"
  }];

this.source.load(data);




    this.form = fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'is_edit': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'is_public': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.title = this.form.controls['title'];
    this.is_edit = this.form.controls['is_edit'];
  }

}
