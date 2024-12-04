import axios from 'axios';
// const apibaseurl = `https://api.themoviedb.org/3`;
const trendingEndpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
const UpcomingEndpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
const topratedEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
const tvseriousEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
const tvseriousbolly = `https://api.themoviedb.org/3/tv/on_the_air?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
const tvseriousdubbed = `https://api.themoviedb.org/3/tv/airing_today?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const Image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const Image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const Image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const detailsmovies = id => `https://api.themoviedb.org/3/movie/${id}?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const creditmovies = id => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const similarmovies = id => `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const personcast = id => `https://api.themoviedb.org/3/person/${id}?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const personMovies = id => `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6e2453a9afc09f6abc6165c9647e6a85`;
export const SearchMovies = `https://api.themoviedb.org/3/search/movie?api_key=6e2453a9afc09f6abc6165c9647e6a85`;




const apiCall = async (endpoint, params) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTI0NTNhOWFmYzA5ZjZhYmM2MTY1Yzk2NDdlNmE4NSIsIm5iZiI6MTczMzEyNDk1NC45OCwic3ViIjoiNjc0ZDYzNWExM2E3ZjJkZDM1ODA1ODhjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NX15VoeScgvhd_tgWcmAn22AijtU3rWvcY9zwxnq5OE'
      },
      params: params || {},
    });
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error.message);
    return {};
  }
};

export const fetchTrendingMovies = () => apiCall(trendingEndpoint);

export const fetchUpcomingMovies = () => apiCall(UpcomingEndpoint);

export const fetchTopRatedMovies = () => apiCall(topratedEndpoint);
export const fetchTVSeries = () => apiCall(tvseriousEndpoint);
export const fetchTVSeriesbolly = () => apiCall(tvseriousbolly);
export const fetchTVSeriesdubbed = () => apiCall(tvseriousdubbed);


export const fetchDetailsMovies = (id) => apiCall(detailsmovies(id),

);

export const fetchCreditMovies = (id) => apiCall(creditmovies(id));

export const fetchSimilarMovies = (id) => apiCall(similarmovies(id));
export const fetchPersoncast = (id) => apiCall(personcast(id));
export const fetchPersonMovies = (id) => apiCall(personMovies(id));
export const fetchSearchMovies = params => apiCall(SearchMovies,params);
