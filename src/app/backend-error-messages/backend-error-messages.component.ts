import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {BackendErrors} from '../shared/models/backendErrors.interface'

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent {
  @Input() backendErrors: BackendErrors = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(
      (name) => `${name} ${this.backendErrors[name].join(' ')}`,
    )
  }
}
