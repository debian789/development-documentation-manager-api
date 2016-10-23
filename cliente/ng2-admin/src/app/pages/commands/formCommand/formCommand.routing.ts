import { Routes, RouterModule } from '@angular/router';
import { FormCommandComponent } from './formCommand.component';

const routes: Routes = [
  {
    path: '',
    component: FormCommandComponent
  }
];
export const routing = RouterModule.forChild(routes);
