import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../shared/services/devices.service';
import { DeviceInfo } from './../models/device-info.model';

@Component({
    selector: 'csg-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
    devices: Array<DeviceInfo>;

    constructor(private devicesService: DevicesService) {
    }

    ngOnInit() {
        this.devicesService.getDevices()
            .then(deviceInfos => this.devices = deviceInfos);
    }

}
