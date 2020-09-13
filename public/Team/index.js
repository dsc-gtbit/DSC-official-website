console.log("Team Page");

let data;

window.onload = () => {
  console.log("Team Page Loaded");
  fetchTeamData();
};

function fetchTeamData() {
  console.log("featching team data");
  const url =
    "https://spreadsheets.google.com/feeds/list/158UVlY_oswJSCLbjl2uQu2qEKi9greNvYO5kveXvRiQ/1/public/full?alt=json";
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      data = result.feed.entry;
      console.log(data);
      setHtml();
    })
    .catch((err) => {
      console.log(err);
    });
}

function setHtml() {
  const teamContainer = document.getElementById("teamContainer");
  data = data;
  data.forEach((e) => {
    teamContainer.innerHTML += `<div class="col-4">
    <img src=${parseKey(e, "imageurl")} alt="image"/>
        ${parseKey(e, "name")}
        </div>
        `;
  });
}

function parseKey(obj, key) {
  console.log(obj);
  return obj["gsx$" + key].$t;
}
