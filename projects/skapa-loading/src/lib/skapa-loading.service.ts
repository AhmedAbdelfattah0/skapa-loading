import { Inject, Injectable, Injector, TemplateRef, inject } from '@angular/core';
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
  dialog: MatDialog
  dialogRef: MatDialogRef<SkapaLoadingComponent>
  @Inject(MAT_DIALOG_DATA) public data: Dialog | any
  constructor(
    injector: Injector

  ) {
     this.dialog = injector.get(MatDialog)
     this.dialogRef =  injector.get(MatDialogRef<SkapaLoadingComponent>)
  }

  // triger an event to show the loading spinner with diffrent text on init
  showLoader() {
    this.loadingState.next(true);
  }
  hideLoader() {
    this.loadingState.next(false);
  }


  getLanguageConstants(lang: string) {
    if (lang === 'ar') {
      return {
        direction: 'rtl',
        languageConstant: languageConstants.ar
      }
    } else {
      return {
        direction: 'ltr',
        languageConstant: languageConstants.en
      }
    }
  }
}
