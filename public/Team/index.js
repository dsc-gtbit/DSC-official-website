let team = {
  "Board": {
    title: "Board",
    leads: [],
    coleads: [],
  },
  "Web": {
    title: "Web",
    leads: [],
    mentors: [],
    members: [],
  },
  "App": {
    title: "Mobile",
    leads: [],
    mentors: [],
    members: [],
  },
  "ML / AI / Data Science": {
    title: "ML",
    leads: [],
    mentors: [],
    members: [],
  },
  "Game Development/ AR/VR": {
    title: "AR/VR ",
    leads: [],
    mentors: [],
    members: [],
  },
  "CyberSecurity": {
    title: "Cyber ",
    leads: [],
    mentors: [],
    members: [],
  },
  "BlockChain": {
    title: "Blockchain ",
    leads: [],
    mentors: [],
    members: [],
  },
  "Competitive Coding": {
    title: "Competitive ",
    leads: [],
    mentors: [],
    members: [],
  },
  "Management": {
    title: "Management ",
    leads: [],
    mentors: [],
    members: [],
  },
  "Marketing": {
    title: "Outreach & Marketing",
    leads: [],
    mentors: [],
    members: [],
  },
  "Designing": {
    title: "Design ",
    leads: [],
    mentors: [],
    members: [],
  },
};
let data;

window.onload = () => {
  console.log("Team Page Loaded");
  fetchTeamData();
};

function fetchTeamData() {
  //console.log("featching team data");
  const url =
    "https://spreadsheets.google.com/feeds/list/158UVlY_oswJSCLbjl2uQu2qEKi9greNvYO5kveXvRiQ/1/public/full?alt=json";
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      data = result.feed.entry;
      //console.log(data);
      setTeamData(data);
      setHtml();
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
    } else if (parseKey(e, "designation") === "Co-Lead") {
      if (team[parseKey(e, "department")].coleads)
        team[parseKey(e, "department")].coleads.push(e);
      else console.log("this dept has not colead position");
    } else if (parseKey(e, "designation") === "Mentor") {
      if (team[parseKey(e, "department")].mentors)
        team[parseKey(e, "department")].mentors.push(e);
    } else {
      if (team[parseKey(e, "department")].members)
        team[parseKey(e, "department")].members.push(e);
    }
  });

  //console.log(team);
}

function setHtml() {
  const teamContainer = document.getElementById("teamContainer");
  teamContainer.innerHTML = " ";
  let data = Object.keys(team);
  //console.log(data);
  let temp = " ";
  data.forEach((e) => {
    temp = "<div class='mb-40 wow fadeInUp'> ";
    temp += `<h2 class="mb-4 text-center">${team[e].title}</h2> <div class="row mx-0">`;

    temp += `  <div class="col-12 col-md-6"><div class="positionLine"><div class="position">${
      team[e].leads.length > 1 ? "Leads" : "Lead"
    }</div></div><div class="row justify-content-center">`;
    team[e].leads.forEach((l) => {
      temp += `  ${getCardHtml(
        parseKey(l, "name"),
        parseKey(l, "imageurl"),
        undefined,
        parseKey(l, "github"),
        parseKey(l, "linkedin"),
        parseKey(l, "twitter")
      )} `;
    });
    temp += "</div></div>";

    if (team[e].coleads) {
      temp += `  <div class="col-12 col-md-6 mt-5 mt-md-0"><div class="positionLine"><div class="position">Co-Leads</div></div><div class="row">`;
      team[e].coleads.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          undefined,
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )} `;
      });
      temp += "</div></div>";
    }

    if (team[e].mentors && team[e].mentors.length > 0) {
      temp += `  <div class="col-12 col-md-6 mt-5 mt-md-0"><div class="positionLine"><div class="position">${
        team[e].mentors.length > 1 ? "Mentors" : "Mentor"
      }</div></div><div class="row justify-content-center">`;
      team[e].mentors.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          undefined,
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )} `;
      });
      temp += "</div></div>";
    }

    if (team[e].members && team[e].members.length > 0) {
      temp += `  <div class="col-12 mt-5 wow fadeInUp" style='display:none' id="${e}-members"><div class="positionLine"><div class="position">Members</div></div><div class="row">`;
      team[e].members.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          "col-6 col-md-3",
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )}`;
      });
      temp += "</div></div>";
      temp += `<div class="positionLine mx-auto mt-30" style='width:98%'><div class="showMemberBtn" onClick="toggleMembers('${e}-members',this)">Show Members</div></div>`;
    }
    temp += "</div> </div>";
    //console.log(temp);
    teamContainer.innerHTML += temp;
  });
}

function parseKey(obj, key) {
  return obj["gsx$" + key].$t.trim();
}

function getCardHtml(
  name,
  img_url,
  classValues = "col-6",
  github,
  linkedin,
  twitter
) {
  //console.log(name, img_url);
  return ` 
  <div class="${classValues}">
  <div class="row teamcard">
    <div class="col-12 text-center">
      <img
        src=${extractor(img_url)}
        alt="pic"
      />
    </div>
    <div class="col-12 text-center mt-3">${name}</div>
    <div class="col-12 d-flex justify-content-around my-3">
      ${
        github
          ? `<div>
            <a
              href=${github}
              target="_blank"
              rel="noopener"
            >
              <i class="fab fa-github socialLinks" ></i>
            </a>
          </div>`
          : ""
      }

      ${
        linkedin
          ? `<div>
        <a
          href=${linkedin}
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-linkedin socialLinks"></i>
        </a>
      </div>`
          : ""
      }

    ${
      twitter
        ? `<div>
        <a href=${twitter} target="_blank" rel="noopener">
          <i class="fab fa-twitter socialLinks"></i>
        </a>
      </div>`
        : ""
    }
    </div>
    </div>
    </div>
  `;
}

function toggleMembers(id, ele) {
  //console.log(id, ele);
  const temp = document.getElementById(id);
  //console.log(temp.style.display);
  if (temp.style.display === "none") {
    temp.style.display = "block";
    ele.innerText = "Hide Members";
  } else {
    temp.style.display = "none";
    ele.innerText = "Show Members";
  }
}

function extractor(url_id) {
  //console.log(url_id.search("google.com"));
  if (url_id) {
    if (url_id.search("google.com") != -1) {
      var id = url_id.split("=");
      url_link = "https://drive.google.com/uc?export=view&id=";
      var url = url_link.concat(id[1]);
    } else {
      url = url_id;
    }

    return url;
  } else
    return "https://drive.google.com/thumbnail?id=1mz35ArVCMbBHQTXebpm2OWFoTvTMrkXA";

  //console.log(url);
}
