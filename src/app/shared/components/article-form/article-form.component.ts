import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {BackendErrorMessagesComponent} from '../../../backend-error-messages/backend-error-messages.component';
import {BackendErrors} from '../../models/backendErrors.interface';
import {ArticleFormValues} from './models/articleFormValues.interface';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValues;
  @Input() isSubmitting?: boolean = false;
  @Input() errors?: BackendErrors | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValues>();

  articleForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.articleForm = this._fb.nonNullable.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: '',
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Initial values are required');
    }
    this.articleForm.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.articleForm.getRawValue();
    const articleFormValues: ArticleFormValues = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
