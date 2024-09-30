import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BannerComponent} from '../shared/components/banner/banner.component';
import {ErrorMessageComponent} from '../shared/components/error-message/error-message.component';
import {FeedTogglerComponent} from '../shared/components/feed-toggler/feed-toggler.component';
import {FeedComponent} from '../shared/components/feed/components/feed.component';
import {PopularTagsComponent} from '../shared/components/tags/popular-tags/popular-tags.component';

@Component({
  selector: 'app-your-feed',
  standalone: true,
  imports: [
    FeedComponent,
    RouterLink,
    BannerComponent,
    ErrorMessageComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
