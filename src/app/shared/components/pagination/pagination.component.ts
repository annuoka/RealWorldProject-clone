import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() currentPage: number = 1;
  @Input() url: string = '';

  pagesCount: number = 1;
  pages: number[] = [];

  constructor(private _utilsService: UtilsService) {}

  ngOnInit() {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this._utilsService.range(1, this.pagesCount) : [];
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
