// =====================================
// RexPark Storage System
// =====================================


const STORAGE_KEY = "rexparkParkingLots";



// Load parking lots

function loadParkingLots() {


    const savedData =
        localStorage.getItem(STORAGE_KEY);



    if(savedData){


        console.log(
            "Loaded parking lots from storage"
        );


        return JSON.parse(savedData);


    }



    console.log(
        "Using default parking lots"
    );


    return parkingLots;


}




// Save parking lots

// Save parking lots
function saveParkingLots() {


    const cleanLots = parkingLots.map(lot => {


        return {

            id: lot.id,

            name: lot.name,

            latitude: lot.latitude,

            longitude: lot.longitude,

            permit: lot.permit,
            
            permitHours: lot.permitHours,

            status: lot.status,

            estimatedSpaces: lot.estimatedSpaces,

            totalSpaces: lot.totalSpaces,

            description: lot.description

        };


    });



    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(cleanLots)

    );



    console.log(
        "Parking lots saved!"
    );


}




// Clear saved data

function resetParkingLots(){


    localStorage.removeItem(
        STORAGE_KEY
    );


    location.reload();


}