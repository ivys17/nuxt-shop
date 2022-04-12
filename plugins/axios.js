export default ({ $axios }) => {
  $axios.onResponse(response => {
    //console.log('onResponse');
    //console.log(`[${response.status}] ${response.request.path}`);
  });

  $axios.onRequest(config => {
    //console.log('onRequest');
    //console.log(config);
  });

  $axios.onError(err => {
    console.log(
      `[${err.response && err.response.status}] ${err.response && err.response.request.path}`);
    console.log(err.response && err.response.data);
  });
}
