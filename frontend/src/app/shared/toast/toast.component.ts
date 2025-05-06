import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  message: string | null = null;
  toastClass: string = '';

  toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.message$.subscribe(({ message, type }) => {
      this.message = message;
      this.toastClass = type;
      setTimeout(() => this.message = null, 3000);
    });
  }
}
