import { Component, ViewEncapsulation } from '@angular/core';


/**
 * Styles required here are common for all components (SASS/SCSS versions of normalize.css and flexboxgrid),
 * so encapsulation is not used. Other components have their styles scoped with `ViewEncapsulation.Emulated`.
 */
@Component({
    selector: 'adit-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class AppComponent {

}
