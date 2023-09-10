import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CardStyle } from '../../models/interfaces';

@Component({
  selector: 'lib-cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class FilterComponent implements OnInit {
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() tags: Array<string> = [''];
  @Input() image: string = '';
  @Input() subject: string = '';
  @Input() publisher: string = '';
  @Input() styles: CardStyle = {};

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
