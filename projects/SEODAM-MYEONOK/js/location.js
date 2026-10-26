const regionSelect = document.querySelector('.location-select select');
const searchInput = document.querySelector('.location-keyword input');
const searchBtn = document.querySelector('.location-search-btn');

const storeItems = document.querySelectorAll('.store-item');
const storeCount = document.querySelector('.location-count span');
function filterStores() {
    const selectedRegion = regionSelect.value;
    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    let visibleCount = 0;


    storeItems.forEach(function (store) {

        const storeRegion = store.dataset.region;

        const storeName = store
            .querySelector('.store-info h3')
            .textContent
            .toLowerCase();

        const regionMatch =
            selectedRegion === '' ||
            storeRegion === selectedRegion;

        const keywordMatch =
            keyword === '' ||
            storeName.includes(keyword);
        if (regionMatch && keywordMatch) {
            store.style.display = '';
            visibleCount++;
        } else {
            store.style.display = 'none';
        }

    });
    storeCount.textContent = visibleCount + '개';
}

searchBtn.addEventListener('click', function () {

    filterStores();

});

regionSelect.addEventListener('change', function () {

    filterStores();

});

searchInput.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {

        filterStores();

    }

});