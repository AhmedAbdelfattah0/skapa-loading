import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DestroyRef, OnInit } from '@angular/core';
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


  constructor(private destroyRef: DestroyRef, private SkapaLoadingService: SkapaLoadingService) {


    let obs1 = this.SkapaLoadingService.getLanguageConstants() as Observable<any>;

    let obs2 = this.SkapaLoadingService.loadingState as Observable<any>;

    // res and obs needs to be renamed for better readability.
    combineLatest([obs1, obs2])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([res1, res2]) => {
        if (res1 && res2) {
          this.selectedLang = res1;
          this.isLoading = res2;
          this.loadingStateChange();
          this.loadingState = this.selectedLang?.LOADING;
          const source = interval(5000);
          this.subscription = source.subscribe((val) =>
            this.loadingStateChange()
          );
        } else {
          this.isLoading = res2;
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


