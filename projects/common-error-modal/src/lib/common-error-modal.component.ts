import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import '@ingka/modal-webc';
import "@ingka/button-webc";
import '@ingka/icon-webc';
 import { CommonErrorModalViewModel } from './common-error-modal.viewModel';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'lib-common-error-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './common-error-modal.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonErrorModalComponent implements OnChanges {
  selectedLang: any;
  modalData: any;
  direction: any;
  inputValue = new FormControl('', [Validators.required]);
  showPassword: boolean = false;
  @Input() lang: 'en' | 'ar' = 'en';
  @Input() selectedLanguageConstants: any;

  constructor(public model: CommonErrorModalViewModel, private destroyRef: DestroyRef) {

    this.model.modalData.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.modalData = res
    })

  }


  ngOnChanges(changes: SimpleChanges): void {

    this.direction = this.model.getLanguageConstants(this.lang)?.direction
    this.selectedLang = this.selectedLanguageConstants
  }

  ngOnInit(): void {
  }



  confirmButtonClick(modalType) {
    if (this.inputValue.value && this.inputValue.value !== "") {
      this.model.confirmButtonEvent(modalType, this.inputValue.value);
    } else {
      this.model.confirmButtonEvent(modalType);
    }
  }

  closeButtonClick() {
    this.model.closeButtonEvent();
  }
}
