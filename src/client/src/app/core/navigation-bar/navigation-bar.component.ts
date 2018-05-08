import { Component, OnInit } from '@angular/core';

import { NavigationLink } from './navigation-link.model';

@Component({
    selector: 'csg-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    links: Array<NavigationLink>;

    constructor() {
    }

    ngOnInit() {
        this.links = [
            new NavigationLink('Manufacturers', '/manufacturers'),
            new NavigationLink('Devices', '/devices')
        ];
    }
}
