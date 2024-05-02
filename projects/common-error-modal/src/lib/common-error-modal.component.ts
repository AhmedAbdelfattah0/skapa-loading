import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import '@ingka/modal-webc';
import "@ingka/button-webc";
import '@ingka/icon-webc';
 import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonErrorModalService } from './common-error-modal.service';

@Component({
  selector: 'lib-common-error-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './common-error-modal.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonErrorModalComponent implements OnChanges, OnDestroy {
  selectedLang: any;
  modalData: any;
  direction: any;
  inputValue = new FormControl('', [Validators.required]);
  showPassword: boolean = false;
  @Input() lang: 'en' | 'ar' = 'en';
  @Input() selectedLanguageConstants: any;
    constructor( public CommonErrorModalService: CommonErrorModalService) {


    this.CommonErrorModalService.modalData.subscribe(res => {
      this.modalData = res
    })

  }



  ngOnChanges(changes: SimpleChanges): void {

    this.direction = this.CommonErrorModalService.getLanguageConstants(this.lang)?.direction
    this.selectedLang = this.selectedLanguageConstants
  }

  ngOnInit(): void {
  }



  confirmButtonClick(modalType) {
    if (this.inputValue.value && this.inputValue.value !== "") {
      this.CommonErrorModalService.confirmButtonTarget(modalType, this.inputValue.value);
    } else {
      this.CommonErrorModalService.confirmButtonTarget(modalType);
    }
  }

  closeButtonClick() {
    this.CommonErrorModalService.closeErrorDailog();
  }

  ngOnDestroy(): void {
    this.CommonErrorModalService.modalData.unsubscribe()
  }
}
