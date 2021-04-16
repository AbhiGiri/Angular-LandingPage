import { Component, OnInit } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css']
})
export class NaArticleListComponent implements OnInit {
  articles: Article[];
  numberOfArticles:number = 10;

  constructor(private newApiService: NewsApiService) {
    this.newApiService.pagesOutput.subscribe(articles => {
      this.articles = articles;
    });
     this.newApiService.getPage(1);

   }

  ngOnInit() {
  }

  onPageChange(numberOfArticles: number) {
    this.newApiService.getPage(numberOfArticles);
  }

}
