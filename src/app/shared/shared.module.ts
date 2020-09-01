import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ANGULAR_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...ANGULAR_MODULES],
  exports: [...ANGULAR_MODULES],
})
export class SharedModule {}
