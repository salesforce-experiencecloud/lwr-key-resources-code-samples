# API error handling sample component

This projects contains an LWC component demonstrating how to handle API errors and redirect to the login page when applicable i.e. if the API call fails with a `401` or a `403` HTTP code and the user is a guest.

The custom object referenced by the sample component is also included in this project.

## Deploy the components to your org

_If you are using SFDX:_

```bash
sfdx force:source:convert -d mdapioutput/ && sfdx force:mdapi:deploy -d mdapioutput/ -u my-org -w 100
```

_If you are using Workbench:_

Upload the `Archive.zip` file located in `mdapioutput/Archive.zip` of this repo.
