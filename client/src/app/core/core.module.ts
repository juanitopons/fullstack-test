import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { throwIfAlreadyLoaded } from 'src/app/core/core.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    NotFoundComponent,
    ToastComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
  ],
  exports: [
    BreadcrumbComponent,
    NotFoundComponent,
    FooterComponent,
    ToastComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
