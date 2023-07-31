import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template: `
    <span class="toast-message">{{ data.message }}</span>
  `,
  styles: [`
    .toast-message {
      color: black;
  font-size: 14px;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBar: MatSnackBar) { }

  

}
