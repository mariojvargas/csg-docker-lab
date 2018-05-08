import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturerInfo } from '.././../models/manufacturer-info.model';

import { EnvironmentService } from '../../shared/environment.service';

@Injectable()
export class ManufacturersService {

    constructor(private httpClient: HttpClient, private environment: EnvironmentService) {
    }

    getManufacturers(): Promise<ManufacturerInfo[]> {
        const endpointUrl = `${this.environment.getApiBaseUrl()}/manufacturers`;

        return this.httpClient.get<ManufacturerInfo[]>(endpointUrl).toPromise();
    }

    getManufacturerByName(name: string): Promise<ManufacturerInfo> {
        const endpointUrl = `${this.environment.getApiBaseUrl()}/manufacturers/${encodeURIComponent(name)}`;

        return this.httpClient.get<ManufacturerInfo>(endpointUrl).toPromise();
    }
}
