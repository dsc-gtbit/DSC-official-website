var project_container = document.getElementById("project-container");

fetch(
  "https://spreadsheets.google.com/feeds/list/1WFacDnB1Ro-1Zs3SRcxR3hcLH_Swnkv5o-_4faKi5jg/1/public/full?alt=json"
)
  .then((res) => res.json())
  .then((data) => {
    var totalProjects = data["feed"]["entry"].length;
    var projects = data["feed"]["entry"];

    console.log(projects);

    // removing loader
    document.querySelector(".loader_container").style.display = "none";

    for (let i = 0; i < totalProjects; i++) {
      // if(i%3==0){
      //     var project_row = document.createElement("div");
      //     project_row.classList.add("row");
      //     project_container.appendChild(project_row);
      // }
      var project_card = document.createElement("div");
      project_card.classList.add("col-md-4", "col-12", "project_card");
      project_card.style.marginTop = "20px";
      project_card.style.marginBottom = "20px";
      project_container.appendChild(project_card);

      var project_card_container = document.createElement("div");
      project_card_container.classList.add("project-card-container");
      project_card.appendChild(project_card_container);

      var project_card_front = document.createElement("div");
      project_card_front.classList.add(
        "card",
        "project-card",
        "project-card-front"
      );
      project_card_front.setAttribute("style", "width: 23rem");
      project_card_container.appendChild(project_card_front);

      var project_card_front_img = document.createElement("img");
      project_card_front_img.classList.add("card-img-top");
      project_card_front_img.setAttribute(
        "src",
        extractor(projects[i]["gsx$projectimage"]["$t"])
      );
      project_card_front_img.setAttribute("style", "width:100%; height:180px");
      project_card_front_img.alt = "Project Image";
      project_card_front.appendChild(project_card_front_img);

      var project_card_front_h5 = document.createElement("h5");
      project_card_front_h5.classList.add("card-title");
      project_card_front_h5.innerText = projects[i]["gsx$projectname"]["$t"];
      project_card_front.appendChild(project_card_front_h5);

      var project_card_front_p = document.createElement("p");
      project_card_front_p.classList.add("card-text");
      project_card_front_p.innerText = projects[i]["gsx$projectdescription"]
        ? projects[i]["gsx$projectdescription"]["$t"]
        : " ";
      project_card_front.appendChild(project_card_front_p);

      var project_card_back = document.createElement("div");
      project_card_back.classList.add(
        "card",
        "project-card",
        "project-card-back"
      );
      project_card_back.setAttribute("style", "width: 23rem");
      project_card_container.appendChild(project_card_back);

      var project_card_back_items = document.createElement("div");
      project_card_back_items.classList.add("items");
      project_card_back.appendChild(project_card_back_items);

      var project_card_back_items_img = document.createElement("img");
      project_card_back_items_img.classList.add("card-img-top");
      project_card_back_items_img.setAttribute(
        "src",
        extractor(projects[i]["gsx$yourphoto"]["$t"])
      );
      project_card_back_items_img.setAttribute(
        "style",
        "border-radius: 50%; width:200px; height:200px;"
      );
      project_card_back_items_img.alt = "Project Image";
      project_card_back_items.appendChild(project_card_back_items_img);

      var project_card_back_items_h1 = document.createElement("h1");

      var project_card_back_items_h1_a = document.createElement("a");
      if (projects[i]["gsx$yourportfoliolinkifyouhave"]["$t"] !== "")
        project_card_back_items_h1_a.href =
          projects[i]["gsx$yourportfoliolinkifyouhave"]["$t"];
      else project_card_back_items_h1_a.removeAttribute("href");
      project_card_back_items_h1_a.innerText =
        projects[i]["gsx$yourname"]["$t"];
      project_card_back_items_h1.appendChild(project_card_back_items_h1_a);
      project_card_back_items.appendChild(project_card_back_items_h1);

      var items_social = document.createElement("div");
      items_social.classList.add("social-handles");

      var items_social_github_a = document.createElement("a");
      if (projects[i]["gsx$githublink"]["$t"] !== "")
        items_social_github_a.href = projects[i]["gsx$githublink"]["$t"];
      else items_social_github_a.style.display = "none";

      var items_social_github_i = document.createElement("i");
      items_social_github_i.classList.add("fab", "fa-github");
      items_social_github_a.appendChild(items_social_github_i);

      var items_social_linkedin_a = document.createElement("a");
      if (projects[i]["gsx$linkedinlink"]["$t"] !== "")
        items_social_linkedin_a.href = projects[i]["gsx$linkedinlink"]["$t"];
      else items_social_linkedin_a.style.display = "none";

      var items_social_linkedin_i = document.createElement("i");
      items_social_linkedin_i.classList.add("fab", "fa-linkedin");
      items_social_linkedin_a.appendChild(items_social_linkedin_i);

      var items_social_twitter_a = document.createElement("a");
      if (projects[i]["gsx$twitterlink"]["$t"] !== "")
        items_social_twitter_a.href = projects[i]["gsx$twitterlink"]["$t"];
      else items_social_twitter_a.style.display = "none";

      var items_social_twitter_i = document.createElement("i");
      items_social_twitter_i.classList.add("fab", "fa-twitter");
      items_social_twitter_a.appendChild(items_social_twitter_i);

      items_social.appendChild(items_social_github_a);
      items_social.appendChild(items_social_linkedin_a);
      items_social.appendChild(items_social_twitter_a);
      project_card_back_items.appendChild(items_social);

      var items_a = document.createElement("a");
      items_a.href = projects[i]["gsx$hostedlink"]["$t"];
      items_a.classList.add("btn", "btn-primary");
      items_a.innerText = "View Project";
      project_card_back_items.appendChild(items_a);
    }
  });

function extractor(url_id) {
  console.log(url_id.search("google.com"));
  if (url_id.search("google.com") != -1) {
    var id = url_id.split("=");
    url_link = "https://drive.google.com/uc?export=view&id=";
    var url = url_link.concat(id[1]);
  } else {
    url = url_id;
  }

  console.log(url);
  return url;
}
