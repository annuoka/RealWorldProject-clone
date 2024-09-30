import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Loading...</div>',
})
export class LoadingComponent {}
