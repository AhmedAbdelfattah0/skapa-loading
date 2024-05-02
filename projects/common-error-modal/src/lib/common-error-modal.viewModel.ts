 import { DestroyRef, EventEmitter, Injectable, Injector, OnDestroy } from "@angular/core";
 import { BehaviorSubject, of, takeUntil } from 'rxjs';
 import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ErrorModel } from "./error.model";
import { CommonErrorModalService } from "./common-error-modal.service";


@Injectable({ providedIn: 'root' })
export class CommonErrorModalViewModel implements OnDestroy  {
  modalData:BehaviorSubject<any> =new BehaviorSubject(null);
  public errorModel: ErrorModel
  constructor( injector:Injector){
this.errorModel=injector.get(ErrorModel)
  }

  ngOnInit() {
    this.errorModel.modalService.modalData.subscribe(res => {
      this.modalData.next(res)
    })
  }


  ngOnDestroy() {
    this.errorModel.modalService.modalData.unsubscribe()
  }

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
