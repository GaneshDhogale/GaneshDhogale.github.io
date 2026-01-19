function scrollVideos(direction) {
    const container = document.getElementById('videoCarousel');
    const scrollAmount = 350; // Width of one card + gap

    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

function scrollAchievements(direction) {
    const container = document.getElementById('achievementCarousel');
    const scrollAmount = 350;

    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}
