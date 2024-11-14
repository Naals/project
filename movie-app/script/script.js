const apiKey = "14b1ac079d73f9eead1552b5775905e8";

const base_url = "https://api.themoviedb.org/3";

const img_url = 'https://image.tmdb.org/t/p/w500';

const genresList = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' }
];




async function fetchPopularMovies() {
    const response = await fetch(`${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);

    const swiperWrapper = document.querySelector('.swiper-wrapper');

    movies.forEach(movie => {
        const slide = document.createElement('div');
        slide.addEventListener('click', () => {
            localStorage.setItem('selectedMovieId', movie.id);
            window.location.href = '../html/movie.html';
        });
        slide.classList.add('swiper-slide');

        slide.innerHTML = `
            <div class="main-slider-box">
                <a href="../html/movie.html" class="main-slider-overlay">
                    <i class="fas fa-play"></i>
                </a>
                <div class="main-slider-img">
                    <img alt="Poster" src="${img_url + movie.poster_path}" />
                </div>
                <div class="main-slider-text">
                    <span class="quality">Full HD</span>
                    <div class="bottom-text">
                        <div class="movie-name">
                            <span>${new Date(movie.release_date).getFullYear()}</span>
                            <a href="#">${movie.title}</a>
                        </div>
                        <div class="category-rating">
                            <div class="category">
                                ${movie.genre_ids.map(id => `<a href="#">${getGenreName(id)}</a>`).join(', ')}
                            </div>
                            <div class="rating">
                                <span>${movie.vote_average}</span> <img alt="IMDb" src="../assets/star.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log(slide);
        swiperWrapper.appendChild(slide);
    });
}
async function fetchTrendingMovies() {
    const response = await fetch(`${base_url}/trending/all/week?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    const movies = data.results;

    const postContainer = document.querySelector('.post-container');

    movies.forEach(movie => {
        const postBox = document.createElement('div');
        postBox.classList.add('post-box');

        postBox.addEventListener('click', () => {
            localStorage.setItem('selectedMovieId', movie.id);
            window.location.href = '../html/movie.html';
        });
        postBox.innerHTML = `
            <a href="../html/movie.html" class="main-slider-overlay">
                 <i class="fas fa-play"></i>
            </a>
            <div class="post-img">
                <img alt="Poster" src="${img_url + movie.poster_path}" />
            </div>
            <div class="main-slider-text">
                <span class="quality">Full HD</span>
                <div class="bottom-text">
                    <div class="movie-name">
                        <span>${new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                        <a href="#">${movie.title || movie.name}</a>
                    </div>
                    <div class="category-rating">
                        <div class="category">
                            ${movie.genre_ids.map(id => `<a href="#">${getGenreName(id)}</a>`).join(', ')}
                        </div>
                        <div class="rating">
                            ${movie.vote_average} <img alt="IMDb" src="../assets/star.svg" />
                        </div>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(postBox);
    });
}
async function fetchTvShows() {
    const response = await fetch(`${base_url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`);
    const data = await response.json();
    const movies = data.results;

    const postContainer = document.querySelector('.post-container');

    movies.forEach(movie => {
        const postBox = document.createElement('div');
        postBox.classList.add('post-box');

        postBox.addEventListener('click', () => {
            localStorage.setItem('selectedMovieId', movie.id);
            window.location.href = '../html/movie.html';
        });
        postBox.innerHTML = `
            <a href="../html/movie.html" class="main-slider-overlay">
                 <i class="fas fa-play"></i>
            </a>
            <div class="post-img">
                <img alt="Poster" src="${img_url + movie.poster_path}" />
            </div>
            <div class="main-slider-text">
                <span class="quality">Full HD</span>
                <div class="bottom-text">
                    <div class="movie-name">
                        <span>${new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                        <a href="#">${movie.title || movie.name}</a>
                    </div>
                    <div class="category-rating">
                        <div class="category">
                            ${movie.genre_ids.map(id => `<a href="#">${getGenreName(id)}</a>`).join(', ')}
                        </div>
                        <div class="rating">
                            ${movie.vote_average} <img alt="IMDb" src="../assets/star.svg" />
                        </div>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(postBox);
    });
}
document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the selected movie ID from localStorage
    const movieId = localStorage.getItem("selectedMovieId");

    if (movieId) {
        try {
            // Fetch movie details using the movie ID
            const response = await fetch(`${base_url}/movie/${movieId}?api_key=${apiKey}&language=en-US`);
            const movie = await response.json();

            document.querySelector('.m-banner-img img').src = img_url + movie.backdrop_path;
            document.querySelector('.movie-title h1').textContent = movie.title;
            document.querySelector('.rating span').textContent = movie.vote_average;
            document.querySelector('.more-about-movie span:nth-child(3)').textContent = new Date(movie.release_date).toDateString();
            document.querySelector('.language span').textContent = movie.spoken_languages.map(lang => lang.english_name).join(", ");
            document.querySelector('.movie-details strong').textContent = movie.title;
            document.querySelector('.movie-details p').textContent = movie.overview;
            document.querySelector('.category').innerHTML = movie.genres.map(genre => `<a href="#">${genre.name}</a>`).join(', ');
            document.querySelector('.more-about-movie span:nth-child(4)').textContent = `${movie.runtime} min`;
            document.querySelector('.tagline').textContent = movie.tagline;
            document.querySelector('.budget').textContent = `Budget: $${movie.budget.toLocaleString()}`;
            document.querySelector('.revenue').textContent = `Revenue: $${movie.revenue.toLocaleString()}`;
            document.querySelector('.homepage a').href = movie.homepage;
            document.querySelector('.homepage a').textContent = movie.homepage;


            const productionContainer = document.querySelector('.production-companies');
            movie.production_companies.forEach(company => {
                const companyEl = document.createElement('div');
                companyEl.classList.add('company');
                companyEl.innerHTML = `
                    ${company.logo_path ? `<img src="${img_url + company.logo_path}" alt="${company.name}" />` : ''}
                    <span>${company.name}</span>
                `;
                productionContainer.appendChild(companyEl);
            });
            // document.querySelector('.category').innerHTML = movie.genres.map(genre => `<a href="#">${genre.name}</a>`).join(', ');
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    } else {
        console.error("No movie selected.");
    }
});

function getGenreName(id) {
    const genre = genresList.find(g => g.id === id);
    return genre ? genre.name : '';
}



document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingMovies();
    fetchPopularMovies();

    // Hide the man slider when searching
    const mainSlider = document.querySelector('#main-slider');
    const sliderBtns = document.querySelector('.slider-btns');
    const searchForm = document.querySelector('.search-box');
    const searchId = document.querySelector('#search-box');


    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        mainSlider.style.display = 'none';
        sliderBtns.style.display = 'none';

        // Hide the main slider

        const query = document.querySelector('.search-input').value;
        if (query) {
            await searchMovies(query);
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const tvShowsLink = document.querySelector('#tvShows');
    const mainSlider = document.querySelector('#main-slider');
    const movieShows = document.querySelector('#movieShows');
    const sliderBtns = document.querySelector('.slider-btns');

    tvShowsLink.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent navigation to keep on index.html
        mainSlider.style.display = 'none';
        sliderBtns.style.display = 'none';
        const menuCheckbox = document.querySelector('#menu-btn');
        fetchTvShows();      // Fetch and display TV shows

        // Close the menu by unchecking the checkbox
        menuCheckbox.checked = false;
    });
    movieShows.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent navigation to keep on index.html
        mainSlider.style.display = 'none';
        sliderBtns.style.display = 'none';
        const menuCheckbox = document.querySelector('#menu-btn');
        fetchTvShows();      // Fetch and display TV shows

        // Close the menu by unchecking the checkbox
        menuCheckbox.checked = false;
    });

    // Close the menu when any link in the menu is clicked
    document.querySelectorAll('.menu li a').forEach(link => {
        link.addEventListener('click', () => {
            menuCheckbox.checked = false;  // Uncheck the menu checkbox
        });
    });
});



async function searchMovies(query) {
    try {
        const postContainer = document.querySelector('.post-container');
        const response = await fetch(`${base_url}/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        const movies = data.results;

        // Clear previous content
        postContainer.innerHTML = '';

        // Populate postContainer with search results
        movies.forEach(movie => {
            const postBox = document.createElement('div');
            postBox.classList.add('post-box');

            postBox.addEventListener('click', () => {
                localStorage.setItem('selectedMovieId', movie.id);
                window.location.href = '../html/movie.html';
            });

            postBox.innerHTML = `
                <a href="../html/movie.html" class="main-slider-overlay">
                    <i class="fas fa-play"></i>
                </a>
                <div class="post-img">
                    <img alt="Poster" src="${img_url + movie.poster_path}" />
                </div>
                <div class="main-slider-text">
                    <span class="quality">Full HD</span>
                    <div class="bottom-text">
                        <div class="movie-name">
                            <span>${new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                            <a href="#">${movie.title || movie.name}</a>
                        </div>
                        <div class="category-rating">
                            <div class="category">
                                ${movie.genre_ids.map(id => `<a href="#">${getGenreName(id)}</a>`).join(', ')}
                            </div>
                            <div class="rating">
                                ${movie.vote_average} <img alt="IMDb" src="../assets/star.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            `;
            postContainer.appendChild(postBox);
        });
    } catch (error) {
        console.error("Failed to fetch search results:", error);
    }
}



