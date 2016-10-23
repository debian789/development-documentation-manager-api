import { Routes, RouterModule } from '@angular/router';
import { ListCommandsComponent } from './listCommands.component';

const routes: Routes = [
  {
    path: '',
    component: ListCommandsComponent
  }
];
export const routing = RouterModule.forChild(routes);
