'use strict';
const grid = document.querySelector('#experiences-grid');
const count = document.querySelector('#results-count');
const priceFilter = document.querySelector('#price-filter');
const categoryButtons = [...document.querySelectorAll('[data-category]')];
const params = new URLSearchParams(window.location.search);
const requestedCategory = params.get('category');
let currentCategory = ['city','coastal','countryside','culture','romantic'].includes(requestedCategory) ? requestedCategory : 'all';
const labels = {city:'City',coastal:'Coastal',countryside:'Countryside',culture:'Culture',romantic:'Romantic'};
function renderCard(item) {
    return `
        <article class="experience-card">
            <div class="card-image-wrap">
                <img
                    src="images/experiences/${item.image}"
                    alt="Illustrative photograph for ${item.title}"
                    loading="lazy"
                    width="600"
                    height="750">
            </div>

            <div class="card-content">
                <span class="card-category">
                    ${labels[item.category]}
                </span>

                <h3>${item.title}</h3>

                <p>${item.description}</p>

                <div class="card-meta">
                    <span>${item.location}</span>
                    <span>${item.duration}</span>
                </div>

                <div class="card-bottom">
                    <strong>From €${item.price}</strong>

                    <button
                        class="text-link details-button"
                        type="button"
                        data-experience="${experiences.indexOf(item)}">
                        View Details ↗
                    </button>
                </div>
            </div>
        </article>
    `;
}
function update() {
  const maxPrice = priceFilter.value === 'all' ? Infinity : Number(priceFilter.value);
  const matches = experiences.filter(item => (currentCategory === 'all' || item.category === currentCategory) && item.price <= maxPrice);
  grid.innerHTML = matches.map(renderCard).join('');
  count.textContent = `${matches.length} of ${experiences.length} experiences`;
  document.querySelector('#empty-state').hidden = matches.length > 0;
  categoryButtons.forEach(button => {
    const active = button.dataset.category === currentCategory;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
categoryButtons.forEach(button => button.addEventListener('click', () => {currentCategory = button.dataset.category;update();}));
priceFilter.addEventListener('change', update);
update();

/* Experience deatails*/

const experienceDialog = document.querySelector('#experience-dialog');
const closeDialogButton = document.querySelector('#dialog-close');

grid.addEventListener('click', function (event) {
    const button = event.target.closest('.details-button');

    if (!button) {
        return;
    }

    const index = Number(button.dataset.experience);
    const item = experiences[index];

    if (!item) {
        return;
    }

    document.querySelector('#dialog-photo').src =
        `images/experiences/${item.image}`;

    document.querySelector('#dialog-photo').alt =
        `Illustrative photograph for ${item.title}`;

    document.querySelector('#dialog-category').textContent =
        labels[item.category];

    document.querySelector('#dialog-title').textContent =
        item.title;

    document.querySelector('#dialog-description').textContent =
        item.description;

    document.querySelector('#dialog-location').textContent =
        item.location;

    document.querySelector('#dialog-duration').textContent =
        item.duration;

    document.querySelector('#dialog-price').textContent =
        `From €${item.price}`;

    document.querySelector('#dialog-expect').textContent =
        item.details || item.description;

    document.querySelector('#dialog-enquire').href =
        `contact/contact.html?experience=${encodeURIComponent(item.title)}`;

    experienceDialog.showModal();
});

closeDialogButton.addEventListener('click', function () {
    experienceDialog.close();
});

experienceDialog.addEventListener('click', function (event) {
    if (event.target === experienceDialog) {
        experienceDialog.close();
    }
});
