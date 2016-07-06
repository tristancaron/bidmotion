import {Component, OnInit, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() continent: string;
  @Input() metric: string;
  @Input() chartMaxResult: string;

  constructor() {}

  ngOnInit() {
  }
}
