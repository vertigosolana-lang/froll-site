const scene = document.getElementById("pondScene");
const overlay = document.getElementById("grassOverlay");
const mascot = document.getElementById("mascot");
const centerPad = document.getElementById("centerPad");
const navPads = Array.from(document.querySelectorAll(".nav-pad"));

let started = false;
let busy = false;

/*
  PUT YOUR REAL JUPITER LINK HERE LATER.

  Replace this:
  https://jup.ag/

  With your final Jupiter swap link.
*/
const JUPITER_LINK = "https://jup.ag/?sell=So11111111111111111111111111111111111111112&buy=2JSG1AQsS4kfev5xAfV9Re33rF8xvuzhnSUR7iGYpump";

/*
  Official $FROLL Twitter/X account.
*/
const TWITTER_LINK = "https://x.com/SolanaFroll";

const sectionLinks = {
  twitter: TWITTER_LINK,
  what: "section.html?section=what",
  tokenomics: "section.html?section=tokenomics",
  buy: JUPITER_LINK
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCenter(element) {
  const rect = element.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  return {
    x: rect.left - sceneRect.left + rect.width / 2,
    y: rect.top - sceneRect.top + rect.height / 2
  };
}

function placeMascotOnPad(pad, instant = false) {
  const point = getCenter(pad);

  mascot.style.left = `${point.x}px`;
  mascot.style.top = `${point.y - 45}px`;

  if (instant) {
    mascot.style.transition = "none";
    mascot.offsetHeight;
    mascot.style.transition =
      "left .72s cubic-bezier(.2, .9, .25, 1), top .72s cubic-bezier(.2, .9, .25, 1), opacity .35s ease";
  }
}

async function jumpToPad(pad) {
  pad.classList.add("clicked");
  mascot.classList.add("jump");

  placeMascotOnPad(pad);

  await sleep(720);

  mascot.classList.remove("jump");

  await sleep(120);

  pad.classList.remove("clicked");
}

async function openGrass() {
  overlay.classList.add("shake");
  await sleep(800);

  overlay.classList.remove("shake");
  overlay.classList.add("open");

  await sleep(900);
}

async function closeGrass() {
  overlay.classList.remove("open");
  overlay.classList.add("transitioning");

  await sleep(1000);

  overlay.classList.add("shake");

  await sleep(750);

  overlay.classList.remove("shake");
}

async function startIntro() {
  if (busy || started) return;

  busy = true;
  started = true;

  await openGrass();

  scene.classList.add("started");
  placeMascotOnPad(centerPad, true);

  const firstPad = navPads.find(pad => pad.dataset.section === "twitter");
  const secondPad = navPads.find(pad => pad.dataset.section === "what");

  await sleep(300);

  if (firstPad) await jumpToPad(firstPad);
  if (secondPad) await jumpToPad(secondPad);

  await jumpToPad(centerPad);

  overlay.style.pointerEvents = "none";

  busy = false;
}

async function goToSection(section, pad) {
  if (!started || busy) return;

  const url = sectionLinks[section];

  if (!url) return;

  busy = true;

  await jumpToPad(pad);

  overlay.style.pointerEvents = "auto";

  await closeGrass();

  window.location.href = url;
}

overlay.addEventListener("click", startIntro);

navPads.forEach(pad => {
  pad.addEventListener("click", () => {
    goToSection(pad.dataset.section, pad);
  });
});

window.addEventListener("load", () => {
  placeMascotOnPad(centerPad, true);

  const params = new URLSearchParams(window.location.search);
  const skipIntro = params.get("skipIntro");

  if (skipIntro === "1") {
    started = true;
    scene.classList.add("started");
    overlay.classList.add("open");
    overlay.style.pointerEvents = "none";
    placeMascotOnPad(centerPad, true);
  }
});

window.addEventListener("resize", () => {
  placeMascotOnPad(centerPad, true);
});
