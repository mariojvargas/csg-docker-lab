import { Component, Input, OnInit } from '@angular/core';

import { ManufacturerInfo } from '../../models/manufacturer-info.model';

@Component({
    selector: 'csg-manufacturer-list',
    templateUrl: './manufacturer-list.component.html',
    styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {
    @Input() manufacturers: Array<ManufacturerInfo[]>;

    constructor() { }

    ngOnInit() {
    }

}
