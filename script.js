const trainData = [];
let displayedTrains = [];

async function loadTrainData() {
	const response = await fetch("station_master_report.csv");
	const data = await response.text();
	const rows = data.split("\n").slice(1);

	trainData.length = 0;

	rows.forEach((row) => {
		const cols = row.split(",");
		if (cols.length >= 8) {
			trainData.push({
				id: cols[0].trim(),
				name: cols[1].trim(),
				arrival: cols[2].trim(),
				departure: cols[3].trim(),
				plateform: cols[4].trim(),
				delay: cols[5].trim(),
				status: cols[6].trim(),
				remarks: cols[7].trim(),
			});
		}
	});

	selectRandomTrains(); // Pick 10 random trains
	renderSchedule();
}

function selectRandomTrains() {
	displayedTrains = [];
	let tempData = [...trainData]; // Copy full data

	for (let i = 0; i < 10; i++) {
		if (tempData.length === 0) break;
		const randomIndex = Math.floor(Math.random() * tempData.length);
		displayedTrains.push(tempData[randomIndex]);
		tempData.splice(randomIndex, 1);
	}
}

function showTab(tabName) {
	const allTabs = document.querySelectorAll(".tab-content");
	allTabs.forEach((tab) => tab.classList.remove("active"));

	const activeTab = document.getElementById(tabName);
	activeTab.classList.add("active");

	if (tabName === "Schedule") {
		loadTrainData(); // Load new random data on each click
	}
}

function renderSchedule() {
	const tableBody = document.querySelector("#trainTable tbody");
	tableBody.innerHTML = "";

	displayedTrains.forEach((train) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <td>${train.id}</td>
            <td>${train.name}</td>
            <td>${train.arrival}</td>
            <td>${train.departure}</td>
            <td>${train.plateform}</td>
            <td>${train.delay}</td>
            <td>${train.status}</td>
            <td>${train.remarks}</td>
        `;
		tableBody.appendChild(row);
	});
}

function printSchedule() {
	const printContent = document.getElementById("Schedule").innerHTML;
	const originalContent = document.body.innerHTML;

	document.body.innerHTML = printContent;
	window.print();
	document.body.innerHTML = originalContent;
	showTab("Schedule");
}

showTab("Main");
