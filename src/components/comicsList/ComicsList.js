import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.sass';


const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'error':
            return <ErrorMessage />;
        case 'confirmed':
            return <Component />;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(16),
          [comicsEnded, setComicsEnded] = useState(false);
    
    const { loading, error, getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        //eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
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
    

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <CSSTransition key={i} timeout={500} classNames="comics__item" >
                    <li className="comics__item" >
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} style={imgStyle} />
                            <div className="comics__name">{item.title}</div>
                            <div className="comics__price">{item.price}</div>
                        </Link>                        
                    </li>
                </CSSTransition>                
            )
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null} >
                    {items}
                </TransitionGroup>                
            </ul>
        )
    }


    return (
        <div className="comics__list">
            { setContent(process, () => renderItems(comicsList), newItemLoading) }
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
    
export default ComicsList;