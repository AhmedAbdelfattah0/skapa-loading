import { Injectable, EventEmitter, DestroyRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonErrorModalService } from './common-error-modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Injectable()
export class ErrorModel  {

    modelEmitter = new BehaviorSubject<any>({});
    constructor(public modalService: CommonErrorModalService,private destroyRef: DestroyRef) {
         this.modalService.modalContentEmitter.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(modalContentEmitter => {
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
    getLanguageConstants(lang:any) {
     return   this.modalService.getLanguageConstants(lang)
    }
}
