// ================================
// RexPark - map.js
// ================================


// Create map
const map = L.map("map").setView(
    [43.8230, -111.7924],
    15
);


// OpenStreetMap tiles
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap Contributors"
    }
).addTo(map);



// ================================
// Global Variables
// ================================

let adminMode = false;

let addingLot = false;

const markers = [];



// ================================
// Parking Information Display
// ================================

function showParkingInfo(lot) {

    document.getElementById("parkingInfo").innerHTML = `

        <h2>${lot.name}</h2>

        <hr>

        <p><strong>Permit:</strong> ${lot.permit}</p>
        
        <p><strong>Permit Hours:</strong> ${lot.permitHours}</p>

        <p><strong>Status:</strong> ${lot.status}</p>

        <p><strong>Estimated Open Spaces:</strong> ${lot.estimatedSpaces}</p>

        <p><strong>Total Spaces:</strong> ${lot.totalSpaces}</p>

        <p>${lot.description}</p>


        <br>


        <button onclick="window.open(
        'https://www.google.com/maps?q=${lot.latitude},${lot.longitude}'
        )">

            🚗 Get Directions

        </button>

    `;

}




function clearParkingInfo() {

    document.getElementById("parkingInfo").innerHTML = `

        <h2>Parking Information</h2>

        <p>Select a parking marker on the map.</p>

    `;

}



// ================================
// Create Marker
// ================================

function createMarker(lot) {


    const marker = L.marker(

        [
            lot.latitude,
            lot.longitude
        ],

        {

            icon:getParkingIcon(lot.status),

            draggable:true

        }

    );


    marker.addTo(map);


    // Disable movement by default
    marker.dragging.disable();



    marker.bindTooltip(

        lot.name,

        {
            permanent:false,
            direction:"top"
        }

    );



    // Save marker reference

    lot.marker = marker;



    markers.push({

        marker:marker,

        lot:lot

    });




    // Marker click

    marker.on(
        "click",
        function(e){

            L.DomEvent.stopPropagation(e);



            if(adminMode){

                openEditor(lot);

            }

            else {

                showParkingInfo(lot);

            }

        }

    );




    // Marker movement

    marker.on(
        "dragend",
        function(){

            const pos = marker.getLatLng();



            lot.latitude =
                Number(pos.lat.toFixed(6));


            lot.longitude =
                Number(pos.lng.toFixed(6));



            console.log(
                `${lot.name} moved`,
                pos
            );


            saveParkingLots();


        }
    );


    return marker;

}



// ================================
// Load Parking Data
// ================================


parkingLots = loadParkingLots();


parkingLots.forEach(
    createMarker
);




// ================================
// Map Click
// ================================


map.on(
    "click",
    function(e){



        clearParkingInfo();



        if(!addingLot){

            return;

        }



        console.log(
            "Creating new parking lot"
        );



        addingLot = false;



        const message =
            document.getElementById(
                "addModeMessage"
            );


        if(message){

            message.style.display = "none";

        }




        const newLot = {


            id:Date.now(),


            name:"New Parking Lot",


            latitude:
                Number(
                    e.latlng.lat.toFixed(6)
                ),


            longitude:
                Number(
                    e.latlng.lng.toFixed(6)
                ),


            permit:"Unknown",


            status:"Full",


            estimatedSpaces:0,


            totalSpaces:0,


            description:""


        };



        parkingLots.push(newLot);



        createMarker(newLot);



        saveParkingLots();



        openEditor(
            newLot,
            true
        );


    }

);