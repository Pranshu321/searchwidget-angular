import { Component, Input, OnInit } from '@angular/core';
import { courseData } from './course-card-data';
import { ICourse } from './model';
import { fetchData } from './Functions/api';
import { GetChannel, GetDefaultChannel, SearchAPI, TermsRead } from './AllAPI';
// import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './test.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() course: ICourse | any = courseData;
  title = 'package-test';
  hostname: string = 'https://www.diksha.gov.in';
  // @Input() AddtionalFilterConfig: Array<{
  //   name: string;
  //   field: string;
  //   isEnabled: boolean;
  // }> = [];
  // @Input() FilterConfig: Array<{
  //   name: string;
  //   field: string;
  //   isEnabled: boolean;
  // }> = [];

  FilterConfig = [
    {
      name: 'Board',
      field: 'se_boards',
      isEnabled: true,
    },
    {
      name: 'Medium',
      field: 'se_mediums',
      isEnabled: true,
    },
    {
      name: 'Subject',
      field: 'subject',
      isEnabled: true,
    },
    {
      name: 'gradeLevel', // Category Name equal
      field: 'se_gradeLevels',
      isEnabled: true, // Filters Name Equal in the API
    },
  ];

  CardsFieldsObject = {
    name: {
      field: 'name',
    },
    type: {
      field: 'se_subjects',
    },
    tags: {
      TagsFieldArray: ['medium', 'se_boards', 'se_subjects'],
    },
    image: {
      field: 'appIcon',
    },
    publisher: { field: 'organisation' },
    subject: { field: 'se_subjects' },
  };

  addtionalFilterConfig = [
    {
      name: 'identifier',
      field: 'name',
      isEnabled: true,
    },
  ];

  FormURL = {
    url: 'http://localhost:3000/form',
    method: 'GET',
  };

  TermsAPI = {
    url: TermsRead.url,
    method: TermsRead.requestOptions.method,
    headers: TermsRead.requestOptions.headers,
  };

  myHeaders = {
    authority: 'www.diksha.gov.in',
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    cookie:
      'ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3AIAkaNRkysQHZHpWRbGvdwM20zusn2P_a.LmEhrIUM13%2BS93U2lnoRCpUB2Ky%2FqIkgaUVsZUBD9sY; __z_a=2865697336181084929418108; connect.sid=s%3AaOuilsz_GloF6Bohw9zcl6FrOoMg_lZr.l5WHggdTn2rH0UManbc5uLk1cpuGSJ3dYLA7kupLwh0',
    origin: 'https://www.diksha.gov.in',
    referer:
      'https://www.diksha.gov.in/explore?selectedTab=textbook&board=CBSE%2FNCERT&&&subject=chemistry&&',
    'sec-ch-ua':
      '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    ts: '2023-07-15T01:09:46+05:30',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'x-app-id': 'prod.diksha.portal',
    'x-app-version': '5.1.0',
    'x-channel-id': 'ORG_001',
    'x-device-id': '0f258c189ff9215ffe63833b0c404e08',
    'x-msgid': '4999fb96-e156-0348-94ae-2fcf81c1abbc',
    'x-org-code': 'ORG_001',
    'x-request-id': '4999fb96-e156-0348-94ae-2fcf81c1abbc',
    'x-session-id': '5d631e51-c0aa-6c16-54c0-424add69b2ed',
    'x-source': 'web',
  };

  SearchAPI = {
    url: SearchAPI.url,
    method: SearchAPI.requestOptions.method,
    body: SearchAPI.requestOptions.body,
    headers: this.myHeaders,
  };
  GetChannelAPI = {
    url: GetChannel.url,
    method: GetChannel.requestOptions.method,
    headers: GetChannel.requestOptions.headers,
  };
  GetDefaultAPI = {
    url: GetDefaultChannel.url,
    method: GetDefaultChannel.requestOptions.method,
    headers: GetDefaultChannel.requestOptions.headers,
  };
  ngOnInit(): void {}
}
