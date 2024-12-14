function request(url, type) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type,
      url,
      success: (res) => {
        resolve(res);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

export default request;
