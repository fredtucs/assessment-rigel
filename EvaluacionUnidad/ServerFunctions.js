function doGet(e) {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle('Club Rigel')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

