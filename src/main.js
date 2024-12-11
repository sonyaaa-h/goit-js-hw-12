import { searchImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";
import iconReject from "./img/error.svg";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery-list");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more-btn");

let searchQuery = "";
let totalPages;
let page;

iziToast.settings({
    timeout: 2000,
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});

const lightbox = new SimpleLightbox('.gallery-list a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
});

form.addEventListener("submit", handleSearch);
loadMore.addEventListener("click", onLoadMore);

function handleSearch(event) {
    event.preventDefault();

    const { input } = event.target.elements;
    searchQuery = input.value.trim();

    if (!searchQuery) {
        gallery.innerHTML = "";

        iziToast.warning({
            title: 'Caution',
            message: "The field is empty, please type your request",
            iconUrl: iconReject,
            titleColor: "#fff",
            titleSize: "16px",
            messageColor: "#fff",
            messageSize: "16px",
            backgroundColor: "#ef4040",
        })
        return;
    }

    page = 1;
    loader.classList.remove("hidden");

    searchImages(searchQuery, page)
        .then(data => {
            if (data.total === 0) {
                throw new Error();
            }
            gallery.innerHTML = createMarkup(data.hits);
            lightbox.refresh();

            totalPages = Math.ceil(data.totalHits / 15);

            if (page < totalPages) {
                loadMore.classList.remove("hidden");
            }

        })
        .catch(error => {
            gallery.innerHTML = "";

            iziToast.error({
                title: 'Error',
                message: "Sorry, there are no images matching your search query. Please try again!",
                iconUrl: iconReject,
                titleColor: "#fff",
                titleSize: "16px",
                messageColor: "#fff",
                messageSize: "16px",
                backgroundColor: "#ef4040",
            })
        })
        .finally(() => {
            loader.classList.add("hidden")
            event.target.reset()
        })
}

async function onLoadMore() {
    page++;
    loadMore.disabled = true;

    try {
        const data = await searchImages(searchQuery, page);
        gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        lightbox.refresh();

        if(page >= totalPages) {
            loadMore.classList.add("hidden");
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height; 
        
        window.scrollBy ({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth",
        })

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: "Sorry, there are no images matching your search query. Please try again!",
            iconUrl: iconReject,
            titleColor: "#fff",
            titleSize: "16px",
            messageColor: "#fff",
            messageSize: "16px",
            backgroundColor: "#ef4040",
        })
    } finally {
        loadMore.disabled = false;
    }

}