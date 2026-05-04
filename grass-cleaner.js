(function () {
  function isBadBackgroundPixel(r, g, b, a) {
    if (a === 0) return false;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const difference = max - min;

    const isWhite = r > 225 && g > 225 && b > 225;
    const isLightGray = max > 155 && difference < 38;
    const isCheckerGray = r > 130 && g > 130 && b > 130 && difference < 28;

    return isWhite || isLightGray || isCheckerGray;
  }

  function cleanGrassImage(img) {
    if (!img || img.dataset.cleaned === "true") return;

    if (!img.complete || !img.naturalWidth) {
      img.addEventListener("load", () => cleanGrassImage(img), { once: true });
      return;
    }

    img.dataset.cleaned = "true";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (isBadBackgroundPixel(r, g, b, a)) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    img.src = canvas.toDataURL("image/png");
  }

  function cleanAllGrassImages() {
    const grassImages = document.querySelectorAll(".grass img");

    grassImages.forEach(img => {
      cleanGrassImage(img);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanAllGrassImages);
  } else {
    cleanAllGrassImages();
  }

  window.addEventListener("load", cleanAllGrassImages);
})();