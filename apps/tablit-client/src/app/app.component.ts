import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {
  GetAllFeatureTogglesGQL,
  SubscribeFeatureToggleUpsertedDocument,
  SubscribeFeatureToggleUpsertedGQL,
  UpsertFeatureToggleGQL,
} from '@tablit/client-data-access';
import { injectMutation, injectQuery } from '@tablit/client-utils';

@Component({
  imports: [
    JsonPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly subscribeFeatureToggleUpsertedGQL = inject(
    SubscribeFeatureToggleUpsertedGQL,
  );
  protected readonly allFeatureTogglesQuery = injectQuery.fromGQL(
    inject(GetAllFeatureTogglesGQL),
  );
  protected readonly upsertFeatureToggleMutation = injectMutation.fromGQL(
    inject(UpsertFeatureToggleGQL),
  );

  constructor() {
    inject(GetAllFeatureTogglesGQL)
      .watch()
      .subscribeToMore({
        document: SubscribeFeatureToggleUpsertedDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          return {
            ...prev,
            getAllFeatureToggles: [
              ...prev.getAllFeatureToggles,
              subscriptionData.data.featureToggleUpserted,
            ],
          };
        },
      });

    this.subscribeFeatureToggleUpsertedGQL
      .subscribe()
      .pipe(takeUntilDestroyed())
      .subscribe((s) => {
        console.log('Subscription result', s);
      });
  }
  protected readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    isControlled: this.fb.nonNullable.control(false),
    isEnabled: this.fb.nonNullable.control(false),
  });

  protected upsert(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();

      return;
    }

    const payload = this.form.getRawValue();
    this.upsertFeatureToggleMutation
      .perform({ payload })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((r) => {
        console.log('Mutation result', r);

        this.form.reset();
      });
  }
}
