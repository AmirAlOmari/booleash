import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GetAllFeatureTogglesGQL } from '@booleash/client-data-access';
import { injectQuery } from '@booleash/client-utils';

@Component({
  imports: [
    JsonPipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly getAllFeatureTogglesGQL = inject(GetAllFeatureTogglesGQL);

  protected readonly allFeatureTogglesQuery = injectQuery.fromGQL(
    this.getAllFeatureTogglesGQL
  );
}
