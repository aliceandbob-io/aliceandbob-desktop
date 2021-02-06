export function download(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

export function showPass(el) {
  if (el.type === "password") {
    el.type = "text";
  } else {
    el.type = "password";
  }
}

export function copy(text, el) {
  const textArea  = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = text;
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  $(el).closest('[class^="col"]').find('.badge').removeClass("d-none");
  setTimeout(function() {
    $(el).closest('[class^="col"]').find('.badge').addClass("d-none");
  },1000);
}
