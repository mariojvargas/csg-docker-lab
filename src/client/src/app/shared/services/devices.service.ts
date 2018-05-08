import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { DeviceInfo } from '../../models/device-info.model';
import { EnvironmentService } from '../environment.service';

@Injectable()
export class DevicesService {

    constructor(private httpClient: HttpClient, private environment: EnvironmentService) {
    }

    getDevices(): Promise<DeviceInfo[]> {
        const endpointUrl = `${this.environment.getApiBaseUrl()}/devices`;
        return this.httpClient.get<DeviceInfo[]>(endpointUrl)
            .toPromise();
    }

    getDevicesByManufacturer(manufacturerName: string): Promise<DeviceInfo[]> {
        const endpointUrl = `${this.environment.getApiBaseUrl()}/manufacturers/${manufacturerName}/devices`;
        return this.httpClient.get<DeviceInfo[]>(endpointUrl)
            .toPromise();
    }
}
