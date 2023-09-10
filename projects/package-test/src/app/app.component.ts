import { Component, Input, OnInit } from '@angular/core';
import { courseData } from './course-card-data';
import { ICourse } from './model';
import { fetchData } from './Functions/api';
import { GetChannel, getDefaultChannel, searchAPI, TermsRead } from './AllAPI';
// import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
