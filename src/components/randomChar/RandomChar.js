import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.sass';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {
    const [char, setChar] = useState({}),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true); 
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();

        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
            
    return (
        <div className="randomchar">
            { errorMessage }
            { spinner }
            { content }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateChar}
                >
                    <div className="inner">Try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir"
                className="randomchar__decoration" />           
            </div>
        </div>
    ) 
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const clazz = (thumbnail === 'image_not_available.jpg') ? {'objectFit': 'contain'} : {'objectFit': 'cover'};

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character"
            className={`randomchar__img ${clazz}`}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>                
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;