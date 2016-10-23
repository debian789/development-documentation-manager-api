import { Routes, RouterModule } from '@angular/router';
import { DetailCommandComponent } from './detailCommand.component';

const routes: Routes = [
  {
    path: '',
    component: DetailCommandComponent
  }
];
export const routing = RouterModule.forChild(routes);
