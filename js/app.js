const adminButton = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const saveButton = document.getElementById("saveLocations");
const exportButton = document.getElementById("exportJson");
const addParkingButton = document.getElementById("addParking");

addParkingButton.addEventListener("click",()=>{


    if(!adminMode){

        alert("Enable Admin Mode first.");

        return;

    }


    addingLot = true;


    document.getElementById(
        "addModeMessage"
    ).style.display = "block";


});


adminButton.addEventListener("click", () => {

    adminMode = !adminMode;

    adminPanel.style.display = adminMode ? "block" : "none";

    adminButton.textContent = adminMode
        ? "🔓 Exit Admin Mode"
        : "🔒 Admin Mode";

    markers.forEach(item => {

        if (adminMode)
            item.marker.dragging.enable();
        else
            item.marker.dragging.disable();

    });

});


saveButton.addEventListener("click", () => {

    console.clear();

    console.log("const parkingLots = ");
    console.log(JSON.stringify(parkingLots, null, 4) + ";");

    alert("Updated parking data has been printed to the browser console.\n\nPress F12 and open the Console tab.");

});

exportButton.addEventListener("click", () => {

    navigator.clipboard.writeText(
        JSON.stringify(parkingLots, null, 4)
    );

    alert("Parking data copied to your clipboard!");

});