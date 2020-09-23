const pastDiv = document.getElementById("past");
const upcomingDiv = document.getElementById("upcoming");
const loader = document.querySelector(".loader_container");

const api_url =
  "https://spreadsheets.google.com/feeds/list/1xT_aIrk3p-1D5H-guczpwBk1NuT-5zh9WM8AL6hOEIw/1/public/full?alt=json";

async function getEventsData(url) {
  const response = await fetch(url);
  const data = await response.json();
  var entries = data.feed.entry;
  loader.style.display = "none";

  for (index in entries) {
    const now = new Date();
    now;
    const compareDate = new Date(entries[index].gsx$date.$t);

    const now_ms = now.getTime();
    const compareDate_ms = compareDate.getTime();

    if (now_ms < compareDate_ms) {
      upcomingDiv.innerHTML += `
			
			<div class='row events'> 
				<div class="col-md-12 cards event-card wow fadeInUp">
				<div class="featured-image">
				<img
					src= ${extractor(entries[index].gsx$imageurl.$t)}
					alt="Event ${index} poster"
					class="card-img-top"
				/>
				</div>
				
				<div class="card-body">
				<h5 class="card-title">${entries[index].gsx$name.$t}</h5>
						
				<table>
				<tr>
					<td width="15%" class="text-blue">
						<i class="far fa-calendar-alt"></i>
					</td>
					<td>${entries[index].gsx$date.$t}</td>
				</tr>
				<tr>
					<td class="text-red">
						<i class="fas fa-map-marker-alt"></i>
					</td>
					<td>${entries[index].gsx$locationorplatform.$t}</td>
				</tr>
				<tr>
					<td class="text-green"><i class="far fa-clock"></i></td>
					<td>${entries[index].gsx$time.$t}</td>
				</tr>
			</table>
			<a class="button float-right"
			href="${entries[index].gsx$eventlink.$t}"
			>Attend</a>	
						</div>
					</div>
		`;
    } else {
      pastDiv.innerHTML +=
        `
		<section class="mb-80">
			<div class="container">
				<div
					class="row my-4 flex-column-reverse flex-sm-row align-items-center"
				>

					<div class="col-sm-6 ml-auto wow fadeInUp">
					<div class="feature-list-wrapper">
						<div class="content-header">
							<h2 class="content-title">${entries[index].gsx$name.$t}</h2>
							<hr />
							<h6>DATE:&ensp;${entries[index].gsx$date.$t}</h6>
							<h6>VENUE:&ensp;${entries[index].gsx$locationorplatform.$t}</h6>
							<p>${entries[index].gsx$description.$t}</p>
						</div>` +
        (entries[index].gsx$eventlink.$t
          ? `<a
						href="${entries[index].gsx$eventlink.$t}"
						class="hero-button"
						target="_blank"
						rel="noopener"
						>EVENT &nbsp;&nbsp;<i class="fa fa-external-link" aria-hidden="true"></i></a>`
          : "") +
        `</div>
					</div>
					<div class="col-sm-5 my-auto">
						<div class="feature-list-image my-4">
						<img src="${extractor(
              entries[index].gsx$imageurl.$t
            )}" style='border-radius:5px;'alt="one event ">
						</div>
					</div>
				</div>
			</div>
		</section>
		`;
    }
  }
}

function extractor(url_id) {
  if (url_id.search("google.com") != -1) {
    var id = url_id.split("=");
    url_link = "https://drive.google.com/uc?export=view&id=";
    var url = url_link.concat(id[1]);
  } else {
    url = url_id;
  }
  return url;
}

getEventsData(api_url);
