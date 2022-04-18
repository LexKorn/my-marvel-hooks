import { useHttp } from '../hooks/http.hook';


const useComicsService = () => {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b466fae6539504cbbd40dbb47d537f3e';
    const _baseOffset = 210;

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.series.name,
            description: comics.description ? `${comics.description.slice(0, 210)}...` : 'There is no description for this character.',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price
        }
    }

    return {loading, error, getAllComics, getComics, clearError}
}

export default useComicsService;