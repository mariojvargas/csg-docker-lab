import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/zip';

import { ManufacturersService } from '../services/manufacturers.service';
import { ManufacturerInfo } from '../../models/manufacturer-info.model';
import { DeviceInfo } from '../../models/device-info.model';
import { DevicesService } from '../../shared/services/devices.service';

@Component({
    selector: 'csg-manufacturer-detail',
    templateUrl: './manufacturer-detail.component.html',
    styleUrls: ['./manufacturer-detail.component.scss']
})
export class ManufacturerDetailComponent implements OnInit {
    manufacturer: ManufacturerInfo;
    devices: DeviceInfo[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private manufacturerService: ManufacturersService,
        private devicesService: DevicesService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap
            .map((paramMap: ParamMap) => paramMap.get('name'))
            .mergeMap(manufacturerName => Observable.zip(
                this.manufacturerService.getManufacturerByName(manufacturerName),
                this.devicesService.getDevicesByManufacturer(manufacturerName)
            ))
            .subscribe((results: [ManufacturerInfo, DeviceInfo[]]) => {
                const [manufacturerInfo, devices] = results;
                this.manufacturer = manufacturerInfo;
                this.devices = devices;
            });
    }
}
