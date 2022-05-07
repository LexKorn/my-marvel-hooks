import { useState } from 'react';

import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";
import SearchPanel from '../searchPanel/SearchPanel';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>        
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>          
                <div className="char__sidebar">
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>   
                <ErrorBoundary>
                    <SearchPanel />
                </ErrorBoundary>  
                </div>                       
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;