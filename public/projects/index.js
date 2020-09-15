// var projectCards = document.getElementById("projectCards");

// fetch("https://spreadsheets.google.com/feeds/list/1WFacDnB1Ro-1Zs3SRcxR3hcLH_Swnkv5o-_4faKi5jg/1/public/full?alt=json")
//     .then(res=>res.json())
//     .then(data=>{
//         var totalProjects=data["feed"]["entry"].length;
//         var projects= data["feed"]["entry"];

//         for (let i = 0; i < totalProjects; i++) {
//             let container = document.createElement('div');
//             container.classList.add('col-md-4', 'col-12');
//             projectCards.appendChild(container);

            
//             let card = document.createElement('div');
//             card.classList.add('card', 'project-card');
//             card.style.width='23rem';
//             container.appendChild(card);


//             let projectImage = document.createElement('img');
//             projectImage.src = projects[i]['gsx$imageurl']['$t'];
//             projectImage.classList.add('card-img-top');
//             projectImage.alt = projects[i]['gsx$name']['$t'];
//             card.appendChild(projectImage);

//             var cardBody = document.createElement('div');
//             cardBody.classList.add('card-body');

//             let cardTitle = document.createElement('h5');
//             cardTitle.innerHTML = projects[i]["gsx$name"]["$t"];
//             cardTitle.classList.add("card-title");

//             let cardText = document.createElement('p');
//             cardText.innerHTML = projects[i]['gsx$description']['$t'];
//             cardText.classList.add('card-text');

//             let projectLink = document.createElement("a");
//             projectLink.href = projects[i]['gsx$workinglink']['$t'];
//             projectLink.innerHTML = 'View Project';
//             projectLink.classList.add('btn', 'btn-primary', 'float-right')


//             let githubLink = document.createElement('a');
//             githubLink.href = projects[i]['gsx$githublink']['$t'];
//             githubLink.classList.add('btn', 'btn-primary', 'float-left');
//             let github = document.createElement('i');
//             githubLink.style.fontSize = "30px";
//             github.classList.add("fab", "fa-github");

//             githubLink.appendChild(github);


//             cardBody.appendChild(cardTitle);
//             cardBody.appendChild(cardText);
//             cardBody.appendChild(projectLink);
//             cardBody.appendChild(githubLink);
//             card.appendChild(cardBody);
            

//         }
//     });

var project_row  = document.getElementById('project-row');

fetch("https://spreadsheets.google.com/feeds/list/1WFacDnB1Ro-1Zs3SRcxR3hcLH_Swnkv5o-_4faKi5jg/1/public/full?alt=json")
.then(res=>res.json())
.then(data=>{
    var totalProjects=data["feed"]["entry"].length;
    var projects= data["feed"]["entry"];

    for (let i = 0; i < totalProjects; i++) {
        var project_card = document.createElement("div");
        project_card.classList.add("col-md-4", "col-12");
        project_row.appendChild(project_card);

        var project_card_container = document.createElement("div");
        project_card_container.classList.add("project-card-container");
        project_card.appendChild(project_card_container);

        var project_card_front = document.createElement("div");
        project_card_front.classList.add("card", "project-card");
        project_card_front.setAttribute("id", "project-card-front");
        project_card_front.id = "project-card-front";
        console.log(project_card_front.id);
    }
});
