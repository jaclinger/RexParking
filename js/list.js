// ================================
// RexPark - Parking List
// ================================

const mapSection = document.getElementById("map");
const listSection = document.getElementById("parkingList");

const mapButton = document.getElementById("mapBtn");
const listButton = document.getElementById("listBtn");

const searchBox = document.getElementById("searchBox");
const parkingListContainer =
    document.getElementById("parkingListContainer");


// ================================
// Show Map
// ================================

mapButton.addEventListener("click", () => {

    mapSection.style.display = "block";
    listSection.style.display = "none";

});


// ================================
// Show List
// ================================

listButton.addEventListener("click", () => {

    mapSection.style.display = "none";
    listSection.style.display = "block";

    renderParkingList();

});


// ================================
// Render List
// ================================

function renderParkingList(filter = "") {

    parkingListContainer.innerHTML = "";

    const search = filter.toLowerCase();

    parkingLots
        .filter(lot =>
            lot.name.toLowerCase().includes(search) ||
            lot.permit.toLowerCase().includes(search)
        )
        .forEach(lot => {

            let color = "green";

            if (lot.status === "Limited")
                color = "orange";

            if (lot.status === "Full")
                color = "red";

            const card = document.createElement("div");

            card.className = "parking-card";

            card.innerHTML = `

                <h3>${lot.name}</h3>

                <p>
                    <strong>Permit:</strong>
                    ${lot.permit}
                </p>

                <p>
                    <strong>Hours:</strong>
                    ${lot.permitHours || "N/A"}
                </p>

                <p>
                    <strong>Spaces:</strong>
                    ${lot.estimatedSpaces}/${lot.totalSpaces}
                </p>

                <span class="status ${color}">
                    ${lot.status}
                </span>

                <br><br>

                <button class="showMap">
                    📍 Show on Map
                </button>

            `;

            card.querySelector(".showMap")
                .addEventListener("click", () => {

                    mapSection.style.display = "block";
                    listSection.style.display = "none";

                    map.setView(
                        [lot.latitude, lot.longitude],
                        17
                    );

                    showParkingInfo(lot);

                    lot.marker.openTooltip();

                });

            parkingListContainer.appendChild(card);

        });

}


// ================================
// Live Search
// ================================

searchBox.addEventListener("input", () => {

    renderParkingList(searchBox.value);

});