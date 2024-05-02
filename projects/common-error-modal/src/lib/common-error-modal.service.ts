import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonErrorModalService {
  modalData: BehaviorSubject<any> = new BehaviorSubject(null);
  confirmButtonEmitter: BehaviorSubject<any> = new BehaviorSubject(null);
  openDialog: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalContentEmitter = new BehaviorSubject<any>({});

  constructor(

  ) {}

  public openErrorDailog(modalData) {
    this.closeErrorDailog();
    this.modalData.next(modalData);
    return this.openDialog.next(true);
  }

  public closeErrorDailog() {
    return this.openDialog.next(false);

  }

  confirmButtonEvent(modalType) {
    if (modalType !== 'API_FAILS') {
      this.confirmButtonEmitter.next(modalType);
    }
    this.closeErrorDailog();
  }


  confirmButtonTarget(modalType: any, inputValue?: any) {

    let obj: any = { status: 'confirm', type: modalType };
    if (inputValue) {
      obj = { ...obj, inputValue: inputValue };
    }
     this.confirmButtonEmitter.next(obj);
    this.modalContentEmitter.next({});
    this.closeErrorDailog();

  }

  getLanguageConstants(lang: any) {
    if (lang === 'ar') {
      return {
        direction: 'rtl',
       }
    } else if (lang === 'en'){
      return {
        direction: 'ltr',
       }
    }
  }
}
