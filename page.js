/*
  PUT YOUR REAL CONTRACT ADDRESS HERE LATER.

  Replace this:
  Paste official contract address here

  With your real CA, for example:
  ANJkHqCbkkxJGZvAYD16Pg8zAa5hiGoJFQxDBXKMpump
*/
const CONTRACT_ADDRESS = "Paste official contract address here";

const pageContent = {
  swamp: {
    title: "Welcome to the Swamp",
    eyebrow: "$FROLL HQ",
    lead: "This is where the frog-troll lives. The pond is the home base, the memes are the fuel, and the community decides how loud the swamp gets.",
    cards: [
      {
        title: "The Pond",
        text: "The main $FROLL landing zone. Everything starts here before the mascot jumps into the next part of the swamp."
      },
      {
        title: "The Energy",
        text: "Cartoon frog chaos mixed with troll meme attitude. Loud, green, unserious, and built for internet culture."
      },
      {
        title: "The Mission",
        text: "Make $FROLL feel different from every generic memecoin site by turning the website itself into a playful swamp experience."
      }
    ]
  },

  what: {
    title: "What is FROLL?",
    eyebrow: "HALF FROG. HALF TROLL.",
    lead: "$FROLL is a frog-and-troll inspired memecoin mascot built around swamp energy, meme culture, and a ridiculous grin that refuses to disappear.",
    cards: [
      {
        title: "Frog Side",
        text: "The pond, the lily pads, the jump animation, and the green swamp aesthetic all come from the frog side of $FROLL."
      },
      {
        title: "Troll Side",
        text: "The face, the chaos, the attitude, and the meme energy come from the troll side. $FROLL is not here to be boring."
      },
      {
        title: "The Brand",
        text: "The goal is simple: make people remember the mascot, the swamp, and the feeling of entering the $FROLL world."
      }
    ]
  },

  tokenomics: {
    title: "Tokenomics",
    eyebrow: "$FROLL ECONOMY",
    lead: "",
    cards: [
      {
        title: "Total Supply",
        text: "1,000,000,000"
      },
      {
        title: "Taxes",
        text: "0/0"
      },
      {
        title: "Contract Address",
        text: CONTRACT_ADDRESS,
        wide: true,
        address: true
      }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const section = params.get("section") || "swamp";

const content = pageContent[section] || pageContent.swamp;

document.title = `$FROLL | ${content.title}`;

document.getElementById("sectionEyebrow").textContent = content.eyebrow;
document.getElementById("sectionTitle").textContent = content.title;

const leadElement = document.getElementById("sectionLead");

if (content.lead && content.lead.trim() !== "") {
  leadElement.textContent = content.lead;
  leadElement.style.display = "block";
} else {
  leadElement.textContent = "";
  leadElement.style.display = "none";
}

const cardsContainer = document.getElementById("sectionCards");
cardsContainer.innerHTML = "";

content.cards.forEach(card => {
  const article = document.createElement("article");

  article.className = "section-info-card";

  if (card.wide) {
    article.classList.add("wide-card");
  }

  if (card.address) {
    article.classList.add("copyable-ca");
    article.setAttribute("data-copy", card.text);
    article.setAttribute("title", "Click to copy contract address");
  }

  const paragraphClass = card.address ? "contract-address" : "";

  article.innerHTML = `
    <h2>${card.title}</h2>
    <p class="${paragraphClass}">${card.text}</p>
  `;

  cardsContainer.appendChild(article);
});

/* COPY CONTRACT ADDRESS */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");

    document.body.removeChild(textarea);

    return success;
  }
}

cardsContainer.addEventListener("click", async event => {
  const copyCard = event.target.closest(".copyable-ca");

  if (!copyCard) return;

  const textToCopy = copyCard.getAttribute("data-copy");

  if (!textToCopy) return;

  const copied = await copyText(textToCopy);

  if (copied) {
    copyCard.classList.add("copied");

    setTimeout(() => {
      copyCard.classList.remove("copied");
    }, 1400);
  }
});

/* SECTION PAGE GRASS TRANSITION */

const overlay = document.getElementById("grassOverlay");
const backButton = document.getElementById("backButton");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function openSectionGrass() {
  if (!overlay) return;

  overlay.style.pointerEvents = "auto";

  await sleep(250);

  overlay.classList.add("shake");

  await sleep(750);

  overlay.classList.remove("shake");
  overlay.classList.add("open");

  await sleep(900);

  overlay.style.pointerEvents = "none";
}

async function closeSectionGrass() {
  if (!overlay) return;

  overlay.style.pointerEvents = "auto";
  overlay.classList.remove("open");
  overlay.classList.add("transitioning");

  await sleep(1000);

  overlay.classList.add("shake");

  await sleep(750);

  overlay.classList.remove("shake");
}

window.addEventListener("load", () => {
  openSectionGrass();
});

if (backButton) {
  backButton.addEventListener("click", async event => {
    event.preventDefault();

    await closeSectionGrass();

    window.location.href = backButton.href;
  });
}