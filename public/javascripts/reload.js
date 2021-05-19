const logger = document.getElementsByClassName("logger");
for (let i = 0; i < logger.length; i++) {
  logger[i].addEventListener("click", refresh);
}

function refresh() {
  window.location.reload();
}