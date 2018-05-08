import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DevicesModule } from './devices/devices.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        DevicesModule,
        ManufacturersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
