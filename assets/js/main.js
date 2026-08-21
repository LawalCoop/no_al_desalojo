(function () {
  var pageUrl = window.location.href;
  var pageTitle = document.title;
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function copyLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(pageUrl)
        .then(function () {
          showToast("Link copiado");
        })
        .catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    var input = document.createElement("input");
    input.value = pageUrl;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showToast("Link copiado");
    } catch (e) {
      showToast("No se pudo copiar el link");
    }
    document.body.removeChild(input);
  }

  var whatsappBtn = document.querySelector('[data-action="whatsapp"]');
  if (whatsappBtn) {
    whatsappBtn.href =
      "https://wa.me/?text=" + encodeURIComponent(pageTitle + " " + pageUrl);
  }

  var telegramBtn = document.querySelector('[data-action="telegram"]');
  if (telegramBtn) {
    telegramBtn.href =
      "https://t.me/share/url?url=" +
      encodeURIComponent(pageUrl) +
      "&text=" +
      encodeURIComponent(pageTitle);
  }

  var copyBtn = document.querySelector('[data-action="copy"]');
  if (copyBtn) {
    copyBtn.addEventListener("click", copyLink);
  }

  var instagramBtn = document.querySelector('[data-action="instagram"]');
  if (instagramBtn) {
    instagramBtn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({ title: pageTitle, url: pageUrl }).catch(function () {});
      } else {
        copyLink();
        showToast("Link copiado: pegalo en tu historia de Instagram");
      }
    });
  }
})();
