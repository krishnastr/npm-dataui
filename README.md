# Data Viz UI Library

Angular CLI version = 11.2.13
Currently this library supports Angular application running on version 11. Support for other versions will be released soon.

## Setup

- Install library
  > npm install @clarivate/data-viz-ui --save
- Include DataVizModule in the app module
- Update the environment & tenant information in the `main.ts` file of the angular project
  tenantId - Tenant ID set for the angular application to integrate with Data Viz
  > DataVizUiEnvironmentManager.setTenant(appToken);
  > DataVizUiEnvironmentManager.setEnvironment(environment);
- Set preserveSymlinks as true in `angular.json` under build in application directory.
  > "preserveSymlinks": true
- In app-routing.module - set child routes for the application from the DataVizModule
  > loadChildren: () => import('data-viz-ui').then(m => m.DataVizUiModule)
- Call `lib-data-viz-ui` component in the code with required parameters and it should populate the content form Visualisation library
  > **NOTE** - Data Viz component should not be invoked from app component but some other component in router-outlet

## Styling

For global styling, changes should be done in `data-viz-component.css`. For component level changes should be at respective css file.

> **Note**: We don't have option to add styles and scripts in angular.json file.

## API urls

Based on environment, application is going to pick api urls. To update urls, you can check appEnvApiUrlMapping object in `data-viz-ui/src/lib/config/app_config.ts` file.

## Embed powerbi reports

Powerbi reports are embeded using a node module called `powerbi-client`, which provides apis to interact with reports.

To load powerbi report, we majorly need three parameters,

1. Embed url
2. Embed token
3. Report ID

We have api service 'getEmbedToken' to fetch all these values. This service expects 'Report ID' as input.

These report ids are currently fetched based on environment and report name.

- Report name can be fetched based user role.

- Report ID should be detached from envBasedReportIdsMap object in `data-viz-ui/src/lib/config/app_config.ts` file.

## Bookmarks

User can save current state of report by using bookmarks. All filters and selections will be in this bookmark. User can add, get, edit and delete bookmarks.

## Roles

Bookmarks and embed token are fetched based on roles assigned. If no roles are provided, role will be passed as 'default' to respective API service.
