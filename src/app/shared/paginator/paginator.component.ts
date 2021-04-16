import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  currentPage = 1;
  pageOptions: number[];

  constructor() {
  }

  ngOnInit() {

    this.pageOptions = [

      this.currentPage - 3,
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
      this.currentPage + 3
    ].filter(pageNumber => pageNumber >= 1 && pageNumber <= this.numberOfPages)
  }

  selectPage(page: number) {
    this.pageChange.emit(page);
    this.currentPage = page;
  }

}
