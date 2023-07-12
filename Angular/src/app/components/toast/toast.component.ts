import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template: `
    <span class="toast-message">{{ data.message }}</span>
  `,
  styles: [`
    .toast-message {
      color: white;
      font-size: 14px;
    }
  `]
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
