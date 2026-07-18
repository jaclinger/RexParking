// =====================================
// RexPark Marker Icons
// =====================================

function getParkingIcon(status) {

    let color;

    switch(status) {

        case "Open":
            color = "green";
            break;

        case "Limited":
            color = "orange";
            break;

        case "Full":
            color = "red";
            break;

        default:
            color = "gray";
    }


    return L.divIcon({

        className: "parking-marker",

        html: `
            <div class="marker-circle ${color}">
                P
            </div>
        `,

        iconSize: [35,35],

        iconAnchor: [17,17]

    });

}