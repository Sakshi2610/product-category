document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateCards('Men');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            fetchAndPopulateCards(category);
        });
    });
});

function fetchAndPopulateCards(category) {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const categoryData = data.categories.find(cat => cat.category_name === category);
            if (categoryData) {
                populateCards(categoryData.category_products);
            } else {
                console.error('Category not found');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function populateCards(products) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;

        const badge = document.createElement('div');
        badge.classList.add('badge');
        badge.textContent = product.badge_text || '';

        if (product.badge_text && product.badge_text.trim() !== '') {
            const badge = document.createElement('div');
            badge.classList.add('badge');
            badge.textContent = product.badge_text;
            card.appendChild(badge);
          }

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');

        const titleVendors = document.createElement('div');
        titleVendors.classList.add('title-vendor');

        const title = document.createElement('h3');
        title.textContent = product.title;
        if (product.title.length > 11) {
            title.textContent = product.title.slice(0, 11) + '...';
          } else {
            title.textContent = product.title;
          }

        const vendor = document.createElement("h4");
        vendor.textContent = "• " + product.vendor;

        const priceCompDisc = document.createElement('div');
        priceCompDisc.classList.add('price-compare-discount');

        const price = document.createElement("p");
        price.textContent = "Rs. " + product.price;

        const comparePrice = document.createElement("p");
        comparePrice.textContent = product.compare_at_price;
        comparePrice.classList.add("compare-price");

        const discount = document.createElement("p");
        const discountPercent = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
        discount.textContent = Math.round(discountPercent) + "% off";
        discount.classList.add("discount");

        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.classList.add('addtocart-buttton')


        titleVendors.appendChild(title);
        titleVendors.appendChild(vendor);
        priceCompDisc.appendChild(price);
        priceCompDisc.appendChild(comparePrice);
        priceCompDisc.appendChild(discount);
        cardInfo.appendChild(titleVendors);
        cardInfo.appendChild(priceCompDisc);
        cardInfo.appendChild(button);
        card.appendChild(image);
        card.appendChild(cardInfo);
        cardContainer.appendChild(card);
    });
}
