import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.sass';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {        
        const {charId} = props;

        if (!charId) {
            return;
        }

    clearError();
    getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({data}) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
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
                                    <Link to={`/comics/${item.resourceURI.substring(43)}`}>{item.name}</Link>
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