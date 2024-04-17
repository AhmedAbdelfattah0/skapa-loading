import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { Subscription, Observable, combineLatest, takeUntil, interval } from 'rxjs';
import { SkapaLoadingService } from './skapa-loading.service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import '@ingka/loading-webc';

@Component({
  selector: 'lib-skapa-loading',
  standalone: true,
  templateUrl: './skapa-loading.component.html',
  styleUrl: './skapa-loading.component.css',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SkapaLoadingComponent implements OnInit {
  isLoading = false;
  loadingState = '';
  subscription: Subscription = new Subscription;
  intervalId!: number;
  loadingIncrementalCounter = 1;
  selectedLang: any;
@Input() lang:string='en'

  constructor(private destroyRef: DestroyRef, private SkapaLoadingService: SkapaLoadingService) {



    // let obs2 = this.SkapaLoadingService.loadingState as Observable<any>;

    // res and obs needs to be renamed for better readability.
    this.SkapaLoadingService.loadingState.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res) {
          this.selectedLang = this.SkapaLoadingService.getLanguageConstants(this.lang);
          console.log('====================================');
          console.log(this.selectedLang,this.lang);
          console.log('====================================');
          this.isLoading = res;
          this.loadingStateChange();
          this.loadingState = this.selectedLang?.LOADING;
          const source = interval(5000);
          this.subscription = source.subscribe((val) =>
            this.loadingStateChange()
          );
        } else {
          this.isLoading = res;
        }
      });
  }

  ngOnInit(): void { }



  loadingStateChange() {
    if (this.isLoading && this.selectedLang) {
      //
      switch (this.loadingIncrementalCounter) {
        case 2:
          this.loadingState = this.selectedLang?.CONTENT_STILL_LOADING;
          break;
        case 3:
          this.loadingState = this.selectedLang?.SORRY_FOR_THE_WAIT;
          break;
        case 4:
          this.loadingState = this.selectedLang?.ANY_SECOND_NOW;
          break;
        default:
          break;
      }
      this.loadingIncrementalCounter++;
    }
  }


  ngOnDestroy(): void {
    this.isLoading = false;
    this.subscription && this.subscription.unsubscribe();
  }
}


