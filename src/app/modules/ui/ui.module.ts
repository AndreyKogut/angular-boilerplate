import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PasswordToggleDirective } from './directives';
import { SanitizeHtmlPipe } from './pipes';

// Basic sharable module with ui components
const components = [SanitizeHtmlPipe, PasswordToggleDirective];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
})
export class UiModule {}
