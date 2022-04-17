import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.sass';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {        
        const {charId} = props;

        if (!charId) {
            return;
        }

    clearError();
    getCharacter(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            { skeleton }
            { errorMessage }
            { spinner }
            { content }
        </div>
    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = (thumbnail === 'image_not_available.jpg') ? {'objectFit': 'contain'} : {'objectFit': 'cover'};
    const comicsIs = (comics.length === 0) ? 'There is no comics for this character.' : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{imgStyle}} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main" target="_blank">
                            <div className="inner">homepage</div>
                        </a> 
                        <a href={wiki} className="button button__secondary" target="_blank">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>                    
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:  <br/>
                <span style={{fontWeight: 'normal', fontSize: 14}}>
                    {comicsIs}
                </span>
            </div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        while (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li> 
                            )
                        }                       
                    })
                }                              
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;