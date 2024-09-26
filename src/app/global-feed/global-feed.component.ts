import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BannerComponent} from '../shared/banner/banner.component';
import {ErrorMessageComponent} from '../shared/error-message/error-message.component';
import {FeedTogglerComponent} from '../shared/feed-toggler/feed-toggler.component';
import {FeedComponent} from '../shared/feed/feed.component';
import {PopularTagsComponent} from '../shared/tags/popular-tags/popular-tags.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [
    FeedComponent,
    RouterLink,
    BannerComponent,
    ErrorMessageComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
