const form = document.querySelector(".main");
var textinp = document.querySelector('textarea[id="txtinput"]');
var placeHolder = document.querySelector(".placeholder");
var resetBtn = document.querySelector(".resetBtn");
var btn = document.querySelector(".btn");
var mainContainer = document.querySelector(".main-container");
var errSection = document.querySelector(".errorSection");
var testText = document.querySelector(".errorHighlighted");
var corrSection = document.querySelector(".correctSection");
var corrText = document.querySelector(".correction");
var flag = 0;

async function GetincorrectWords(text) {
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txtinput: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

function highlightTokens(tokens, indices) {
  tokens = tokens.map((token, index) => {
    if (indices.includes(index)) {
      return `<span class="highlight">${token}</span>`;
    } else return token;
  });
  let highlightedString = tokens.join(" ");
  return highlightedString;
}

function init() {
  form.reset();
  textinp.classList.add("animation");
  placeHolder.classList.add("animation");
  btn.classList.add("animation");
}
init();

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  var result;
  try {
    result = await GetincorrectWords(textinp.value);
    console.log(result);
  } catch (error) {
    console.error("Error during form submission:", error);
  }
  btn.classList.add("hidden");
  var resetBtn = document.querySelector(".resetBtn");
  textinp.classList.add("TranslateX");
  let tokenizedText = result.tokenizedText;
  let indices = result.indices;
  console.log(indices);
  if (indices.length === 0) {
    testText.innerHTML = "No incorrect words found";
    errSection.classList.add("animation");
  } else {
    let corrections = result.correction;
    let hText = highlightTokens(tokenizedText, indices);
    testText.innerHTML = hText;
    corrText.innerHTML = corrections;
    errSection.classList.add("animation");
    corrSection.classList.add("animation");
    flag = 1;
  }
  /*let indices = [2, 4];
  let hText = highlightTokens(textinp.value.split(" "), indices);
  testText.innerHTML = hText;
  corrText.innerHTML = hText;
  errSection.classList.add("animation");
  corrSection.classList.add("animation");
  */
  resetBtn.classList.add("animation");
});

resetBtn.addEventListener("click", function () {
  resetBtn.classList.add("hidden");
  setTimeout(() => {
    resetBtn.classList.remove("animation");
  }, 2000);
  setTimeout(() => {
    resetBtn.classList.remove("hidden");
  }, 2000);
  btn.classList.remove("hidden");
  errSection.classList.add("hidden");
  setTimeout(() => {
    errSection.classList.remove("animation");
  }, 1000);
  setTimeout(() => {
    errSection.classList.remove("hidden");
  }, 1000);
  if (flag === 1) {
    corrSection.classList.add("hidden");
    setTimeout(() => {
      corrSection.classList.remove("animation");
    }, 1000);
    setTimeout(() => {
      corrSection.classList.remove("hidden");
    }, 1000);
    flag = 0;
  }
  textinp.classList.remove("TranslateX");
  form.reset();
  init();
});
