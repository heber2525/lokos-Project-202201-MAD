import { Link } from 'react-router-dom';
import './Photo.scss';
import { useContext, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Overlay from '../Overlay/Overlay';
import { Context } from '../../context/contextProvider';
import { checkFavoriteState } from './checkFavoriteState';

export function Photo({ photo }) {
    const { state, addPhoto, deletePhoto } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);

    const updateFavoriteState = () => {
        setIsFavorite(checkFavoriteState(state, photo));
    };
    const handleClick = () => {
        addPhoto(photo);
        updateFavoriteState();
    };
    const handleDeleteClick = () => {
        const payload = state.favoritePhotos.find(
            (item) => item.myId === photo.id
        );

        deletePhoto(payload);
        updateFavoriteState();
    };
    useEffect(() => {
        updateFavoriteState();
    });
    return (
        <div className="photo">
            <div className="photo__container">
                <Overlay photo={photo} />
                <Link to={`/detail/id=${photo.id}`}>
                    <img
                        className="photo__img"
                        src={photo.urls.small}
                        alt={photo.alt_description}
                    />
                </Link>
            </div>
            <div className="photo__info-container">
                <div className="photo__user-container">
                    <div className="photo__user-photo-container">
                        <img
                            src={photo.user.profile_image.small}
                            alt={photo.user.first_name}
                        />
                    </div>
                    <h2 className="photo__user-name">{photo.user.username}</h2>
                </div>
                {isFavorite ? (
                    <AiFillHeart
                        onClick={handleDeleteClick}
                        role="button"
                        className="photo__heart-icon"
                        data-testid="delete-btn"
                    />
                ) : (
                    <AiOutlineHeart
                        onClick={handleClick}
                        role="button"
                        className="photo__heart-icon"
                        data-testid="add-btn"
                    />
                )}
            </div>
        </div>
    );
}
