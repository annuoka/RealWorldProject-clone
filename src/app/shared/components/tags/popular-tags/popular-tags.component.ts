import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {PopularTag} from '../../../models/article.interface';
import {ErrorMessageComponent} from '../../error-message/error-message.component';
import {selectError} from '../../feed/store/feed.reducers';
import {LoadingComponent} from '../../loading/loading.component';
import {TagListComponent} from '../tag-list/tag-list.component';
import {tagsActions} from './store/tags.actions';
import {selectTagsData, selectTagsIsLoading} from './store/tags.reducers';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [
    CommonModule,
    TagListComponent,
    LoadingComponent,
    ErrorMessageComponent,
    RouterLink,
  ],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  data$: Observable<{
    isLoading: boolean;
    tags: PopularTag[] | null;
    error: string | null;
  }>;

  constructor(private _store: Store) {
    this.data$ = combineLatest({
      isLoading: this._store.select(selectTagsIsLoading),
      tags: this._store.select(selectTagsData),
      error: this._store.select(selectError),
    });
  }

  ngOnInit() {
    this._store.dispatch(tagsActions.getTags());
    console.log(this.data$);
  }
}
