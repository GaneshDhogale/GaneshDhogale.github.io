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
