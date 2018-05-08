import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class EnvironmentService {

    getApiBaseUrl(): string {
        return environment.apiBaseUrl;
    }
}
