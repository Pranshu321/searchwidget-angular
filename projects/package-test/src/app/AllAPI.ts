var myHeaders = new Headers();
myHeaders.append('authority', 'www.diksha.gov.in');
myHeaders.append('accept', 'application/json');
myHeaders.append('accept-language', 'en-US,en;q=0.9');
myHeaders.append('content-type', 'application/json');
myHeaders.append(
  'cookie',
  'ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3AIAkaNRkysQHZHpWRbGvdwM20zusn2P_a.LmEhrIUM13%2BS93U2lnoRCpUB2Ky%2FqIkgaUVsZUBD9sY; __z_a=2865697336181084929418108; connect.sid=s%3AaOuilsz_GloF6Bohw9zcl6FrOoMg_lZr.l5WHggdTn2rH0UManbc5uLk1cpuGSJ3dYLA7kupLwh0'
);
myHeaders.append('origin', 'https://www.diksha.gov.in');
myHeaders.append(
  'referer',
  'https://www.diksha.gov.in/explore?selectedTab=textbook&board=CBSE%2FNCERT&&&subject=chemistry&&'
);
myHeaders.append(
  'sec-ch-ua',
  '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"'
);
myHeaders.append('sec-ch-ua-mobile', '?0');
myHeaders.append('sec-ch-ua-platform', '"Windows"');
myHeaders.append('sec-fetch-dest', 'empty');
myHeaders.append('sec-fetch-mode', 'cors');
myHeaders.append('sec-fetch-site', 'same-origin');
myHeaders.append('ts', '2023-07-15T01:09:46+05:30');
myHeaders.append(
  'user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
);
myHeaders.append('x-app-id', 'prod.diksha.portal');
myHeaders.append('x-app-version', '5.1.0');
myHeaders.append('x-channel-id', 'ORG_001');
myHeaders.append('x-device-id', '0f258c189ff9215ffe63833b0c404e08');
myHeaders.append('x-msgid', '4999fb96-e156-0348-94ae-2fcf81c1abbc');
myHeaders.append('x-org-code', 'ORG_001');
myHeaders.append('x-request-id', '4999fb96-e156-0348-94ae-2fcf81c1abbc');
myHeaders.append('x-session-id', '5d631e51-c0aa-6c16-54c0-424add69b2ed');
myHeaders.append('x-source', 'web');

var raw = JSON.stringify({
  request: {
    filters: {
      subject: [],
      audience: [],
      primaryCategory: [],
      se_boards: [],
      se_gradeLevels: [],
      se_mediums: [],
    },
    limit: 100,
    fields: [
      'name',
      'appIcon',
      'mimeType',
      'gradeLevel',
      'identifier',
      'medium',
      'pkgVersion',
      'board',
      'subject',
      'resourceType',
      'primaryCategory',
      'contentType',
      'channel',
      'organisation',
      'trackable',
      'se_boards',
      'se_subjects',
      'se_mediums',
      'se_gradeLevels',
    ],
    facets: ['se_subjects'],
  },
});

const url = `https://www.diksha.gov.in/api/content/v1/search?orgdetails=orgName,email&framework=ekstep_ncert_k`;

export const SearchAPI = {
  url: url,
  requestOptions: {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  },
};

// GET Default Channel
var myHeaders = new Headers();
myHeaders.append('authority', 'www.diksha.gov.in');
myHeaders.append('accept', 'application/json');
myHeaders.append('accept-language', 'en-US,en;q=0.9');
myHeaders.append(
  'cookie',
  'ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3A75HSg_aGUS9I4axbElNTcDAU4J7008oj.CW1ssg8wHxgC6BSJJOBKnQUzMmbfIebcJultGGV6E8k; __z_a=157831982408696518540869'
);
myHeaders.append('if-none-match', 'W/"16f-Gbb5UGVUTrPNje4whzeKOKL7+dQ"');
myHeaders.append(
  'referer',
  'https://www.diksha.gov.in/explore?board=CBSE&medium=English&gradeLevel=Class%2012&&id=ekstep_ncert_k-12&selectedTab=textbook'
);
myHeaders.append(
  'sec-ch-ua',
  '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
);
myHeaders.append('sec-ch-ua-mobile', '?0');
myHeaders.append('sec-ch-ua-platform', '"Windows"');
myHeaders.append('sec-fetch-dest', 'empty');
myHeaders.append('sec-fetch-mode', 'cors');
myHeaders.append('sec-fetch-site', 'same-origin');
myHeaders.append('ts', '2023-08-25T13:11:00+05:30');
myHeaders.append(
  'user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
);
myHeaders.append('x-app-id', 'prod.diksha.portal');
myHeaders.append('x-app-version', '5.1.0');
myHeaders.append('x-msgid', 'c902d3ac-5938-d800-f63f-6671529a0ef0');
myHeaders.append('x-request-id', 'c902d3ac-5938-d800-f63f-6671529a0ef0');
myHeaders.append('x-session-id', '03ca4f3c-3331-3ff4-1546-d17bbdcf76c4');
myHeaders.append('x-source', 'web');

const GetDefaultChannelURL =
  'https://www.diksha.gov.in/learner/data/v1/system/settings/get/custodianOrgId';

export const GetDefaultChannel = {
  url: GetDefaultChannelURL,
  requestOptions: {
    method: 'GET',
    headers: myHeaders,
  },
};

// Channel Read
var myHeaders = new Headers();
myHeaders.append('authority', 'www.diksha.gov.in');
myHeaders.append('accept', 'application/json');
myHeaders.append('accept-language', 'en-US,en;q=0.9');
myHeaders.append(
  'cookie',
  'ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3A75HSg_aGUS9I4axbElNTcDAU4J7008oj.CW1ssg8wHxgC6BSJJOBKnQUzMmbfIebcJultGGV6E8k; __z_a=157831982408696518540869'
);
myHeaders.append('if-none-match', 'W/"28c3-W+NGJ5P6BZMTWdY51iqtwWKQvkw"');
myHeaders.append(
  'referer',
  'https://www.diksha.gov.in/explore?board=CBSE&medium=English&gradeLevel=Class%2012&id=ekstep_ncert_k-12&selectedTab=textbook'
);
myHeaders.append(
  'sec-ch-ua',
  '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"'
);
myHeaders.append('sec-ch-ua-mobile', '?0');
myHeaders.append('sec-ch-ua-platform', '"Windows"');
myHeaders.append('sec-fetch-dest', 'empty');
myHeaders.append('sec-fetch-mode', 'cors');
myHeaders.append('sec-fetch-site', 'same-origin');
myHeaders.append('ts', '2023-08-25T13:11:01+05:30');
myHeaders.append(
  'user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
);
myHeaders.append('x-app-id', 'prod.diksha.portal');
myHeaders.append('x-app-version', '5.1.0');
myHeaders.append('x-channel-id', 'ORG_001');
myHeaders.append('x-device-id', '0f258c189ff9215ffe63833b0c404e08');
myHeaders.append('x-msgid', '7f0d3aa7-dd0f-35d2-fae9-4a6a0c6b92a2');
myHeaders.append('x-org-code', 'ORG_001');
myHeaders.append('x-request-id', '7f0d3aa7-dd0f-35d2-fae9-4a6a0c6b92a2');
myHeaders.append('x-session-id', '03ca4f3c-3331-3ff4-1546-d17bbdcf76c4');
myHeaders.append('x-source', 'web');

const GetChannelURL =
  'https://www.diksha.gov.in/api/channel/v1/read/0126684405014528002';

export const GetChannel = {
  url: GetChannelURL,
  requestOptions: {
    method: 'GET',
    headers: myHeaders,
  },
};

// Terms Read
var myHeaders = new Headers();
myHeaders.append('authority', 'www.diksha.gov.in');
myHeaders.append('accept', 'application/json');
myHeaders.append('accept-language', 'en-US,en;q=0.9');
myHeaders.append(
  'cookie',
  'ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3Al0W3lTbRJB0gA90IJ-NeVHXns2Ynl77t.Fik6V0achLcV3UNkMxdtFu2DNIxS6jQTAlXHBTr1yA0; __z_a=1284476324412326095441232'
);
myHeaders.append('if-none-match', 'W/"1f850-6SR4AgfdQr7UN+v8XVIIFC/M7D4"');
myHeaders.append(
  'referer',
  'https://www.diksha.gov.in/explore?board=CBSE%2FNCERT&medium=English&gradeLevel=Class%2012&&id=ekstep_ncert_k-12&selectedTab=textbook'
);
myHeaders.append(
  'sec-ch-ua',
  '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"'
);
myHeaders.append('sec-ch-ua-mobile', '?0');
myHeaders.append('sec-ch-ua-platform', '"Windows"');
myHeaders.append('sec-fetch-dest', 'empty');
myHeaders.append('sec-fetch-mode', 'cors');
myHeaders.append('sec-fetch-site', 'same-origin');
myHeaders.append('ts', '2023-08-17T18:07:52+05:30');
myHeaders.append(
  'user-agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
);
myHeaders.append('x-app-id', 'prod.diksha.portal');
myHeaders.append('x-app-version', '5.1.0');
myHeaders.append('x-channel-id', 'ORG_001');
myHeaders.append('x-device-id', '0f258c189ff9215ffe63833b0c404e08');
myHeaders.append('x-msgid', 'fafb3152-257d-4ab7-299c-0f0bf5c8982b');
myHeaders.append('x-org-code', 'ORG_001');
myHeaders.append('x-request-id', 'fafb3152-257d-4ab7-299c-0f0bf5c8982b');
myHeaders.append('x-session-id', '11f9b5bd-0adf-7ae0-a008-c01c7e987f17');
myHeaders.append('x-source', 'web');

export const TermsReadURL =
  'https://www.diksha.gov.in/api/framework/v1/read/ekstep_ncert_k-12?categories=board,gradeLevel,medium,class,subject';

export const TermsRead = {
  url: TermsReadURL,
  requestOptions: {
    method: 'GET',
    headers: myHeaders,
  },
};
