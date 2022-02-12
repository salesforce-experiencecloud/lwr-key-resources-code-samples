import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { loadScript } from 'c/resourceLoader';

export default class ResourceComponent extends LightningElement {

    @api styleResource;
    @api scriptResource;

    setup = false;

    renderedCallback() {
        if (!this.setup) {
            if (this.scriptResource) loadScript(this.scriptResource);
            if (this.styleResource) loadStyle(this, this.styleResource);

            this.setup = true;
        }
    }
}