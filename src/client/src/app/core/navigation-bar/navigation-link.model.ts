export class NavigationLink {
    readonly text: string;
    readonly route: string;

    constructor(text, route) {
        this.text = text;
        this.route = route;
    }
}
