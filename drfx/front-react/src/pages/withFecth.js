
function FetchPostGet(url) {
  console.log(url)
  fetch(url)
    .then(
      res => res.json()
    )
    .then(json =>
      console.log(json)
    )
};


function FetchPostPut(url, data, id) {
  var form_data = new FormData();
  form_data.append('image', data.image);
  form_data.append('title', data.title);
  form_data.append('content', data.content);

  fetch(url + id + '/', {
    method: 'PUT',
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    body: form_data
  })
}


export default {
  FetchPostGet,
  FetchPostPut,
};

/*
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
*/