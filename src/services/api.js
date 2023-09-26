import axios from 'axios'

//BASE URL :  https://api.themoviedb.org/3/
// URL DA API : https://api.themoviedb.org/3/movie/now_playing?api_key=6dbc3d5fef3a8a2a7f319cfb155da5b0&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;