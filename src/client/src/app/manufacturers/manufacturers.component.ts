import { Component, OnInit } from '@angular/core';
import { ManufacturersService } from './services/manufacturers.service';
import { ManufacturerInfo } from '../models/manufacturer-info.model';

@Component({
    selector: 'csg-manufacturers',
    templateUrl: './manufacturers.component.html',
    styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit {
    manufacturers: Array<ManufacturerInfo>;

    constructor(private manufacturersService: ManufacturersService) {
    }

    ngOnInit() {
        this.manufacturersService.getManufacturers()
            .then(manufacturers => this.manufacturers = manufacturers);
    }
}
