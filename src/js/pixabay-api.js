import axios from 'axios';

export async function searchImages(search, page = 1) {
    const API_KEY = "47398520-23b63bacec280c041aa8780c5";
    const BASE_URL = "https://pixabay.com/api/";

    const { data } = await axios(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            page,
            per_page: 15,
            q: search,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        } 
    });
    
    return data;


}

