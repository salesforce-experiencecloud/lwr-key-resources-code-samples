import { api, LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/My_Object__c.Name";
import isGuest from "@salesforce/user/isGuest";

const LOGIN_PAGE_REFERENCE = {
  type: "comm__namedPage",
  attributes: {
    name: "Login"
  }
};

/**
 * This component shows how to handle API error
 * and redirect guest users to the login page when applicable.
 */
export default class Cmp extends NavigationMixin(LightningElement) {
  @api recordId;

  error;
  recordName;

  constructor() {
    super();

    // store a promise that will get resolved when connectedCallback() is invoked
    this.onConnect = new Promise(
      (resolve) => (this.resolveOnConnect = resolve)
    );
  }

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD]
  })
  setRecord({ data, error }) {
    if (isGuest && error && (error.status === 401 || error.status === 403)) {
      // wait for connectedCallback() to be invoked
      // to make sure that the navigation mixin is ready as well
      this.onConnect.then(() =>
        this[NavigationMixin.Navigate](LOGIN_PAGE_REFERENCE)
      );
    } else if (error) {
      this.showError(error);
    } else if (data) {
      this.recordName = getFieldValue(data, NAME_FIELD);
    }
  }

  /**
   * See https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_error
   */
  showError(error) {
    if (Array.isArray(error.body)) {
      this.error = error.body.map((e) => e.message).join(", ");
    } else if (typeof error.body.message === "string") {
      this.error = error.body.message;
    } else {
      this.error = "Unknown error";
    }
  }

  connectedCallback() {
    this.resolveOnConnect();
  }
}
