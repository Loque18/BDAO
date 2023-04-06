import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlassPanelComponent } from './components/glass-panel/glass-panel.component';
import { BasicModalComponent } from './components/basic-modal/basic-modal.component';

@NgModule({
  declarations: [
    BasicModalComponent,
    GlassPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GlassPanelComponent,
    BasicModalComponent
  ]
})
export class ModalModule { }
