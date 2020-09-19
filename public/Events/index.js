const pastDiv = document.getElementById("past");
const upcomingDiv = document.getElementById("upcoming");

const api_url =
	"https://spreadsheets.google.com/feeds/list/1xT_aIrk3p-1D5H-guczpwBk1NuT-5zh9WM8AL6hOEIw/1/public/full?alt=json";

async function getEventsData(url) {
	const response = await fetch(url);
	const data = await response.json();
	const entries = data.feed.entry;
	console.log(entries);
	// console.log(entries[1].gsx$description.$t);
	for (index in entries) {
		// console.log(entries[index].gsx$description.$t);
		// console.log(entries[index].gsx$date.$t);
		// console.log(now);
		const now = new Date();
		now;
		const compareDate = new Date(entries[index].gsx$date.$t);

		const now_ms = now.getTime();
		const compareDate_ms = compareDate.getTime();

		// console.log(compareDate);
		// console.log(compareDate_ms);

		if (now_ms < compareDate_ms) {
			console.log("upcoming");
			upcomingDiv.innerHTML += `

				<div class="row">
					<div class="card event-card wow fadeInUp">
					<img
					alt="Event one poster"
					class="card-img-top"
					data-src="${entries[index].gsx$imageurl.$t}"
				/>
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
					<td>${entries[index].gsx$location.$t}</td>
				</tr>
				<tr>
					<td class="text-green"><i class="far fa-clock"></i></td>
					<td>0900hrs - 1200hrs</td>
				</tr>
			</table>
			<a class="button float-right"
			href="https://www.meetup.com/GDG-Kisii/events/258696811/"
			>Attend</a>	
						</div>
					</div>
				</div>
		`;
		} else {
			console.log("past");
			pastDiv.innerHTML += `
		<section class="section-spacer>
			<div class="container">
				<div
					class="row flex-column-reverse flex-sm-row align-items-cengit ter"
				>

					<div class="col-sm-5 mr-auto wow fadeInUp">
					<div class="feature-list-wrapper">
						<div class="content-header">
							<h2 class="content-title">${entries[index].gsx$name.$t}</h2>
							<hr />
							<h6>DATE:${entries[index].gsx$date.$t}</h6>
							<h6>VENUE:${entries[index].gsx$location.$t}</h6>
							<p>${entries[index].gsx$description.$t}</p>
						</div>
						<a
						href="#"
						class="past-event"
						target="_blank"
						rel="noopener"
						>EVENT PHOTOS&nbsp;&nbsp;<i class="fas fa-camera"></i
					></a>
					</div>
					</div>
					<div class="col-sm-6">
						<div class="feature-list-image">
						<img src="${entries[index].gsx$imageurl.$t}" alt="" width="400" height="350">
						</div>
					</div>
				</div>
			</div>
		</section>
		`;
		}
	}
}

getEventsData(api_url);
