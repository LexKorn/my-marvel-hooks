import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBaner from "../appBaner/AppBaner";


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getCharacter, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {        
        clearError();

        switch (dataType) {
            case 'character' :
                getCharacter(id).then(onDataLoaded);
                break;
            case 'comic' :
                getComic(id).then(onDataLoaded);
                break;
        }
        
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;


    return (
        <>
            <AppBaner />
            { errorMessage }
            { spinner }
            { content }
        </>
    )
}

export default SinglePage;