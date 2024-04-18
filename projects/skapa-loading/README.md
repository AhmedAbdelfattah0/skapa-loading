# SkapaLoading

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Code scaffolding
# NGX SKAPA LOADING BALL

NGX SKAPA LOADING is an Angular library for loading-page showing a dynamically multi-lang changed message with SKAPA loading bouncing ball.

## Installation

Use the package manager [npm](https://nodejs.org/en) to install SKAPA-LOADING.

```npm
npm install skapa-loading
```

## Usage

```angular
 import { SkapaLoadingComponent, SkapaLoadingService } from 'ngx-skapa-loading';
```
## DI the service 
```
   constructor(private SkapaLoadingService: SkapaLoadingService) {}
```

## to show the loader 
```
 this.SkapaLoadingService.showLoader();
```

## to hide the loader 
```
 this.SkapaLoadingService.hideLoader();
```
## HTML
```html
<ngx-skapa-loading [lang]="'ar'"></ngx-skapa-loading>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

