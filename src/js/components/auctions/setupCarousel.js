/**
 * Sets up the carousel for an auction.
 *
 * @param {Object} auctionDetails - The details of the auction.
 */
export function setupCarousel(auctionDetails) {
    const carouselIndicators = document.querySelector("#carouselExampleIndicators .carousel-indicators");
    const carouselInner = document.querySelector("#carouselExampleIndicators .carousel-inner");

    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    auctionDetails.media.forEach((imageSrc, index) => {
        const indicatorElement = document.createElement('li');
        indicatorElement.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicatorElement.setAttribute('data-bs-slide-to', index);
        if (index === 0) {
            indicatorElement.classList.add('active');
        }
        carouselIndicators.appendChild(indicatorElement);

        const imageElement = document.createElement('div');
        imageElement.classList.add('carousel-item');
        if (index === 0) {
            imageElement.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('carousel-image');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('carousel-image-container');
        imgContainer.appendChild(img);

        imageElement.appendChild(imgContainer);
        carouselInner.appendChild(imageElement);
    });

    carouselIndicators.style.display = auctionDetails.media.length <= 0 ? 'none' : 'flex';

    const displayStyle = auctionDetails.media.length <= 1 ? 'none' : 'block';
    document.querySelector('.carousel-control-prev').style.display = displayStyle;
    document.querySelector('.carousel-control-next').style.display = displayStyle;
}