import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EnvironmentService } from './environment.service';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DevicesService } from './services/devices.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DeviceListComponent,
        ManufacturerListComponent
    ],
    declarations: [
        DeviceListComponent,
        ManufacturerListComponent
    ],
    providers: [
        EnvironmentService,
        DevicesService
    ]
})
export class SharedModule { }
