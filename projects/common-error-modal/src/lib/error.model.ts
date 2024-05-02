import { Injectable, EventEmitter, DestroyRef, Injector, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonErrorModalService } from './common-error-modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Injectable()
export class ErrorModel implements OnDestroy {
  public modalService: CommonErrorModalService
  modelEmitter = new BehaviorSubject<any>({});

  constructor(injector: Injector) {
    this.modalService = injector.get(CommonErrorModalService);
    this.modalService.modalContentEmitter.subscribe(modalContentEmitter => {
      this.modelEmitter.next(modalContentEmitter);
    })
  }



  closeModalFunc() {
    this.modalService.closeErrorDailog();
  }

  confirmButtonEventFn(modalType, inputValue?: any) {
    this.modalService.confirmButtonTarget(modalType, inputValue);
  }

  closeButtonEventFn() {
    this.modalService.closeErrorDailog()
  }
  getLanguageConstants(lang: any) {
    return this.modalService.getLanguageConstants(lang)
  }

  ngOnDestroy(): void {
    this.modalService.modalContentEmitter.unsubscribe();
  }

}
