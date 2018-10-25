import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriptionsHelper implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
