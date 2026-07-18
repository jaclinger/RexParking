// =====================================
// RexPark Editor
// =====================================


let newLotCreated = false;


// Editor elements
const editor = document.getElementById("editor");

const editName = document.getElementById("editName");
const editPermit = document.getElementById("editPermit");
const editPermitHours =
    document.getElementById("editPermitHours");
const editEstimated = document.getElementById("editEstimated");
const editTotal = document.getElementById("editTotal");
const editDescription = document.getElementById("editDescription");

const calculatedStatus = document.getElementById("calculatedStatus");


// Buttons
const saveLotButton = document.getElementById("saveLot");
const cancelLotButton = document.getElementById("cancelLot");
const deleteLotButton = document.getElementById("deleteLot");




// =====================================
// Calculate Parking Status
// =====================================

function calculateStatus(available, total) {


    if(total <= 0)
        return "Full";


    if(available <= 0)
        return "Full";


    const percentage = available / total;


    if(percentage <= 0.25)
        return "Limited";


    return "Open";

}




// =====================================
// Open Editor
// =====================================

function openEditor(lot, isNew = false) {

    editor.style.display = "block";

    editingLot = lot;

    newLotCreated = isNew;

    editName.value = lot.name;

    editPermit.value = lot.permit;

    editPermitHours.value = lot.permitHours ?? "";

    editEstimated.value = lot.estimatedSpaces;

    editTotal.value = lot.totalSpaces;

    editDescription.value = lot.description;

    calculatedStatus.textContent =
        "Current Status: " + lot.status;
}

// =====================================
// Close Editor
// =====================================

function closeEditor() {


    editor.style.display = "none";


    editingLot = null;


    newLotCreated = false;


}




// =====================================
// Live Status Preview
// =====================================

function updateCalculatedStatus(){


    const status = calculateStatus(

        Number(editEstimated.value),

        Number(editTotal.value)

    );


    calculatedStatus.textContent =
        "New Status: " + status;


}



editEstimated.addEventListener(
    "input",
    updateCalculatedStatus
);


editTotal.addEventListener(
    "input",
    updateCalculatedStatus
);





// =====================================
// Save Parking Lot
// =====================================

saveLotButton.addEventListener("click", () => {


    if(!editingLot)

        return;



    editingLot.name =
        editName.value.trim();



    editingLot.permit =
        editPermit.value.trim();

    editingLot.permitHours =
        editPermitHours.value.trim();



    editingLot.estimatedSpaces =
        Number(editEstimated.value);



    editingLot.totalSpaces =
        Number(editTotal.value);



    editingLot.status =
        calculateStatus(

            editingLot.estimatedSpaces,

            editingLot.totalSpaces

        );



    editingLot.description =
        editDescription.value.trim();





    // Update marker icon

    editingLot.marker.setIcon(
        getParkingIcon(editingLot.status)
    );



    // Update tooltip

    editingLot.marker.setTooltipContent(
        editingLot.name
    );



    // Save permanently

    saveParkingLots();



    // Refresh information panel

    showParkingInfo(editingLot);



    closeEditor();



});







// =====================================
// Cancel Editing
// =====================================

cancelLotButton.addEventListener("click", () => {



    // Remove new temporary lot

    if(newLotCreated && editingLot){


        map.removeLayer(
            editingLot.marker
        );



        const index =
            parkingLots.indexOf(editingLot);



        if(index > -1){

            parkingLots.splice(index,1);

        }



        const markerIndex =
            markers.findIndex(
                item => item.lot === editingLot
            );



        if(markerIndex > -1){

            markers.splice(markerIndex,1);

        }


    }



    closeEditor();


    clearParkingInfo();



});







// =====================================
// Delete Parking Lot
// =====================================

deleteLotButton.addEventListener("click", () => {



    if(!editingLot)

        return;




    const confirmDelete = confirm(

        `Delete ${editingLot.name}?`

    );



    if(!confirmDelete)

        return;





    map.removeLayer(
        editingLot.marker
    );




    const index =
        parkingLots.indexOf(editingLot);



    if(index > -1){

        parkingLots.splice(index,1);

    }





    const markerIndex =
        markers.findIndex(
            item => item.lot === editingLot
        );



    if(markerIndex > -1){

        markers.splice(markerIndex,1);

    }




    saveParkingLots();



    clearParkingInfo();


    closeEditor();



});