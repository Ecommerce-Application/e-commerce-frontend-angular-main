import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchParam: string = '';
  searchType: string = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  searchProduct() {
    this.route.navigate([`/search/${this.searchParam}/${this.searchType}`])
  }
}
