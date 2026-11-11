
document.addEventListener("DOMContentLoaded", function () {

    const trips = [
        {
            name: "Little Lambs & Irish Farm Life",
            location: "COUNTY GALWAY · COUNTRYSIDE",
            description: "Discover the charm of Irish farm life, meet adorable lambs and enjoy countryside traditions together.",
            duration: "Approx. 1 hour",
            highlights: "Lambs · Sheepdogs · Farm traditions",
            image: "images/family/irish-farm.jpg",
            alt: "Lambs on an Irish farm"
        },
        {
            name: "Castles, Fairies & Little Explorers",
            location: "COUNTY CLARE · HERITAGE",
            description: "Explore Ireland's historic castles, discover traditional village life and enjoy stories that spark the imagination.",
            duration: "Half-day itinerary",
            highlights: "Historic castle · Folk village · Family discovery",
            image: "images/family/family-castle.jpg",
            alt: "Historic castle in the Irish countryside"
        },
        {
            name: "Woodland Wonders & Hidden Lakes",
            location: "COUNTY WICKLOW · NATURE",
            description: "Follow gentle woodland paths, admire peaceful lakes and discover the natural beauty of Wicklow together.",
            duration: "Half-day itinerary",
            highlights: "Lakes · Woodland trails · Scenic views",
            image: "images/family/wicklow-lakes.jpg",
            alt: "Lake surrounded by mountains in Wicklow"
        }
    ];

    let currentTrip = 0;

    const image = document.getElementById("family-image");
    const name = document.getElementById("family-name");
    const location = document.getElementById("family-location");
    const description = document.getElementById("family-description");
    const duration = document.getElementById("family-duration");
    const highlights = document.getElementById("family-highlights");
    const counter = document.getElementById("family-counter");

    const previous = document.querySelector(".family-prev");
    const next = document.querySelector(".family-next");

    if (!image || !previous || !next) return;

    function showTrip(index) {
        currentTrip = (index + trips.length) % trips.length;

        const trip = trips[currentTrip];

        image.src = trip.image;
        image.alt = trip.alt;

        name.textContent = trip.name;
        location.textContent = trip.location;
        description.textContent = trip.description;
        duration.textContent = trip.duration;
        highlights.textContent = trip.highlights;

        counter.textContent =
            String(currentTrip + 1).padStart(2, "0") +
            " / " +
            String(trips.length).padStart(2, "0");
    }

    previous.addEventListener("click", function () {
        showTrip(currentTrip - 1);
    });

    next.addEventListener("click", function () {
        showTrip(currentTrip + 1);
    });

    // Allow visitors to swipe between trips on mobile.
    const slider = document.querySelector(".family-slider");
    let touchStartX = 0;

    slider.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 50) {
            showTrip(currentTrip + (difference < 0 ? 1 : -1));
        }
    }, { passive: true });

    showTrip(0);
});
