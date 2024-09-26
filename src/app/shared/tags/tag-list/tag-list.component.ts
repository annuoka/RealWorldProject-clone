import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PopularTag} from '../../models/article.interface';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input() tags: PopularTag[] | null = null;
}
