console.log("Team Page");

let team = {
  "Board": {
    title: "Board Members",
    leads: [],
    coleads: [],
  },
  "Web": {
    title: "Web Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "Mobile": {
    title: "Mobile Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "ML": {
    title: "ML Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "AR/VR": {
    title: "AR/VR Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "Cyber": {
    title: "Cyber Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "BlockChain": {
    title: "Blockchain Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "Management": {
    title: "Management Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "Marketing": {
    title: "Marketing Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
  "Designing": {
    title: "Design Team",
    leads: [],
    mentors: [],
    memebers: [],
  },
};
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
      setTeamData(data);
      //setHtml();
    })
    .catch((err) => {
      console.log(err);
    });
}

function setTeamData(data) {
  data.forEach((e) => {
    if (!team[parseKey(e, "department")]) {
      console.log("dept doesn't exist:", parseKey(e, "department"));
      return;
    }

    console.log(parseKey(e, "department"));
    if (parseKey(e, "designation") === "Lead") {
      team[parseKey(e, "department")].leads.push(e);
    } else if (parseKey(e, "designation") === "Colead") {
      if (team[parseKey(e, "department")].coleads)
        team[parseKey(e, "department")].coleads.push(e);
      else console.log("this dept has not colead position");
    } else if (parseKey(e, "designation") === "Mentor") {
      team[parseKey(e, "department")].mentors.push(e);
    } else {
      team[parseKey(e, "department")].members.push(e);
    }
  });

  console.log(team);
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
  return obj["gsx$" + key].$t;
}
