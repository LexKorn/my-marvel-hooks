import { Link } from 'react-router-dom';
import './singleCharacterLayout.sass';


const SingleCharPage = ({data}) => {
    const {name, description, thumbnail, comics} = data;
    const comicsIs = (comics.length === 0) ? 'There is no comics for this character.' : null;

    return (       
        <div className="single-char">
            <img src={thumbnail} alt={name} className='single-char__img' />
            <div className="single-char__info">
                <h2 className='single-char__name'>{name}</h2>
                <p className='single-char__descr'>{description}</p>
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
            </div>
            <div className="single-char__back">
                <Link to="/" className="single-char__back">Back to Main page</Link>
            </div>           
        </div>     
    )
}

export default SingleCharPage;