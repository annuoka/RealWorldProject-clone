import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BannerComponent} from '../shared/banner/banner.component';
import {FeedTogglerComponent} from '../shared/feed-toggler/feed-toggler.component';
import {FeedComponent} from '../shared/feed/feed.component';
import {PopularTagsComponent} from '../shared/tags/popular-tags/popular-tags.component';

@Component({
  selector: 'app-tag-feed',
  standalone: true,
  imports: [
    BannerComponent,
    FeedComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.scss',
})
export class TagFeedComponent {
  apiUrl: string = '';
  tagName: string = '';

  constructor(private _route: ActivatedRoute) {
    this._route.params.subscribe((params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
