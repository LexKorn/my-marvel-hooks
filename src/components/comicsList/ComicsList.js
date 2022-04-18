import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';

import useComicsService from '../../services/ComicsService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.sass';


const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(0),
          [comicsEnded, setComicsEnded] = useState(false);
    
    const {loading, error, getAllComics} = useComicsService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    // const itemRefs = useRef([]);

    // const focusOnItem = (id) => {
    //     itemRefs.current.forEach(item => item.classList.remove('comics__item__selected'));
    //     itemRefs.current[id].classList.add('comics__item__selected');
    //     itemRefs.current[id].focus();
    // }
    

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className="comics__item"
                    // tabIndex={0}
                    // ref={ el => itemRefs.current[i] = el }
                    key={item.id}>
                    {/* onClick={() => {
                        props.onComicsSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onComicsSelected(item.id);
                            focusOnItem(i);
                        }
                    }}> */}
                        <a href='#'>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                            <div className="comics__name">{item.name}</div>
                            <div className="comics__price">{item.price}$</div>
                        </a>                        
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !setNewItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            { errorMessage }
            { spinner }
            { items }
            <button 
                className="button button__main button__long"                   
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
}

// ComicsList.propTypes = {
//     onComicsSelected: PropTypes.func.isRequired
// }
    
export default ComicsList;