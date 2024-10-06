let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.banner-images img');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Kembali ke slide terakhir
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Kembali ke slide pertama
    }

    const offset = -currentSlide * 600; // Offset untuk menggeser gambar
    document.querySelector('.banner-images').style.transform = `translateX(${offset}px)`;
}
