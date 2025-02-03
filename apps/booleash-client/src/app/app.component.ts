import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { GetDataGQL } from '@booleash/client-data-access';
import { tap } from 'rxjs';

@Component({
  imports: [JsonPipe, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly getDataGQL = inject(GetDataGQL);

  title = 'booleash-client';
  protected readonly qr = toSignal(
    this.getDataGQL
      .watch()
      .valueChanges.pipe(tap((qr) => console.debug('qr', qr)))
  );

  constructor() {
    // this.getDataGQL
    //   .watch()
    //   .valueChanges.pipe(takeUntilDestroyed())
    //   .subscribe((qr) => {
    //     console.debug('qr', qr);
    //     this.qr = qr;
    //   });
  }
}
