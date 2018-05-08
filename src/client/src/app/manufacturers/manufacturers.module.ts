import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersService } from './services/manufacturers.service';
import { ManufacturersComponent } from './manufacturers.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        ManufacturersRoutingModule
    ],
    exports: [
        ManufacturersComponent
    ],
    declarations: [
        ManufacturersComponent,
        ManufacturerDetailComponent
    ],
    providers: [
        ManufacturersService
    ]
})
export class ManufacturersModule { }
