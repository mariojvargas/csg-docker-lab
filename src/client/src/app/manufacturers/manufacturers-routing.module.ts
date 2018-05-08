import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturersComponent } from './manufacturers.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

const routes: Routes = [
    {
        path: 'manufacturers',
        component: ManufacturersComponent
    },
    {
        path: 'manufacturers/:name',
        component: ManufacturerDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
