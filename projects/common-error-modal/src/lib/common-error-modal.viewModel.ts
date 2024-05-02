 import { DestroyRef, EventEmitter, Injectable, Injector } from "@angular/core";
 import { BehaviorSubject, of, takeUntil } from 'rxjs';
 import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ErrorModel } from "./error.model";
import { CommonErrorModalService } from "./common-error-modal.service";


@Injectable({ providedIn: 'root' })
export class CommonErrorModalViewModel   {
  modalData:BehaviorSubject<any> =new BehaviorSubject(null)
  constructor( private destroyRef: DestroyRef, public errorModel: ErrorModel){

    this.errorModel.modalService.modalData.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.modalData.next(res)
    })
  }
  // confirmButtonEvent(modalType){
  //   return  this.commonErrorModalComponentService.confirmButtonEvent(modalType)
  // }

  closeButtonEvent(){
    return this.errorModel.closeModalFunc()
  }


  getLanguageConstants(lang:any){
    return this.errorModel.getLanguageConstants(lang)
  }

  confirmButtonEvent(modalType, inputValue?: any) {
    this.errorModel.confirmButtonEventFn(modalType, inputValue);
  }

}
