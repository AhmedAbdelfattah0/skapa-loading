import { Inject, Injectable, TemplateRef, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { SkapaLoadingComponent } from './skapa-loading.component';
import { languageConstants } from './translation.constant';

@Injectable({
  providedIn: 'root'
})
export class SkapaLoadingService {
  loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<SkapaLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog | any

    )
  {}

  // triger an event to show the loading spinner with diffrent text on init
  showLoader() {
    this.loadingState.next(true);
  }
  hideLoader() {
    this.loadingState.next(false);
  }


  getLanguageConstants() {
    if (localStorage.getItem('ln') === 'ar') {
      return of({
        direction: 'rtl',
        languageConstant: languageConstants.ar
      })
    } else {
      return of({
        direction: 'ltr',
        languageConstant: languageConstants.en
      })
    }
  }
}
