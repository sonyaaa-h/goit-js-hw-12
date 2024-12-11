export const createMarkup = (arr) => {
    return arr
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img
    class="gallery-image"
    src="${webformatURL}"
    alt="${tags}"
    />
    </a>
    <ul class="info-list">

    <li class="info-item">
    <p class="info-title">Likes</p>
    <p class="info-value">${likes}</p>
    </li>

    <li class="info-item">
    <p class="info-title">Views</p>
    <p class="info-value">${views}</p>
    </li>

    <li class="info-item">
    <p class="info-title">Comments</p>
    <p class="info-value">${comments}</p>
    </li>

    <li class="info-item">
    <p class="info-title">Downloads</p>
    <p class="info-value">${downloads}</p>
    </li>

    </ul>
    </li>
    `).join("");
}