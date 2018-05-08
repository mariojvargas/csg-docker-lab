import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        DevicesRoutingModule
    ],
    declarations: [
        DevicesComponent
    ],
    exports: [
        DevicesComponent
    ],
    providers: []
})
export class DevicesModule { }
