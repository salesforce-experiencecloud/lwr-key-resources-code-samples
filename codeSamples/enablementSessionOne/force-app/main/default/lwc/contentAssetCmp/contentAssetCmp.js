import { LightningElement, track } from 'lwc';
import assetWithReferentialIntegrity from '@salesforce/contentAssetUrl/ceo';

export default class ContentAssetCmp extends LightningElement {
	@track image = assetWithReferentialIntegrity;
}