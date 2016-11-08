import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public errorLogin: boolean= false;

  constructor(
    fb:FormBuilder,
    @Inject('serviceData') private serviceData,
    private storage:SessionStorageService,
    protected router: Router
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    let self = this;
    self.errorLogin = false;
    if (this.form.valid) {
      this.serviceData.postData('sessions', values, (status, data) => {
        if (status === 200) {
          self.storage.store('user',data);
          this.router.navigate(['/pages/dashboard']);
        } else if (status === 401) {
          self.errorLogin = true;
        }
      });
    }
  }
}
