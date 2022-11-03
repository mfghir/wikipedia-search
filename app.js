const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formCon = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const resultsCon = document.querySelector(".results");

formCon.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = formInput.value;

  if (!val) {
    resultsCon.innerHTML =
      '<div class="error">Please enter valid search term</div>';
    return;
  }

  fetchSearch(val);
});

const fetchSearch = async (searchValue) => {
  resultsCon.innerHTML = '<div class="loading"></div>';

  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;

    if (results.length < 1) {
      resultsCon.innerHTML =
        '<div class="error">No matching results. Please try again</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    resultsCon.innerHTML = '<div class="error">There was an error...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
        <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>${snippet}</p>
        </a>`;
    })
    .join("");

  resultsCon.innerHTML = `<div class="articles">${cardsList}</div>`;
};
