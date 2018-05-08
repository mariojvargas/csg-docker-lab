import { Component, Input, OnInit } from '@angular/core';
import { DeviceInfo } from '../../models/device-info.model';

@Component({
    selector: 'csg-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
    @Input() devices: Array<DeviceInfo>;

    constructor() { }

    ngOnInit() {
    }
}
