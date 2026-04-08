function loadVehicles() {
    fetch("backend/get_vehicles.php")
        .then(res => res.json())
        .then(data => renderTable(data));
}

function renderTable(data) {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    let parkedCount = 0;

    data.forEach(v => {
        if (v.status === "Parked") parkedCount++;

        table.innerHTML += `
            <tr>
                <td>${v.time_in}</td>
                <td>${v.plate}</td>
                <td>${v.type}</td>
                <td>
                    <span class="badge ${v.status === 'Parked' ? 'bg-success' : 'bg-secondary'}">
                        ${v.status}
                    </span>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalVehicles").innerText = parkedCount;

    let totalSlots = 200;
    let available = totalSlots - parkedCount;

    document.getElementById("slots").innerText = `${available} / ${totalSlots}`;
    document.getElementById("progressBar").style.width =
        (parkedCount / totalSlots) * 100 + "%";
}

function signOutVehicle() {
    let plate = prompt("Enter Plate Number:");

    fetch("backend/signout.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `plate=${plate}`
    }).then(() => loadVehicles());
}

// SEARCH
document.getElementById("searchInput").addEventListener("keyup", function () {
    fetch(`backend/search.php?q=${this.value}`)
        .then(res => res.json())
        .then(data => renderTable(data));
});

loadVehicles();