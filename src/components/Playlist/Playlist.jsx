// À réaliser : 
// - Afficher le nom de la playlist, sa description, sa date de création, le nombre de musique, la durée totale, le type de playlist (publique = pas de cadenas ou privé = cadenas --> pour l'instant)
// - Afficher la liste de toutes les musiques
// - Cliquer sur une musique
// - Changer la musique actuelle
// - Mettre la musique active en surbrilliance

// Suite à réaliser :
// - Ajouter un bouton pour supprimer une musique
// - Ajouter un bouton pour ajouter une musique
// - Ajouter un bouton pour modifier les informations de la playlist

import React from "react";

const Playlist = ({ name, description, creationDate, trackCount, totalDuration, isPublic, tracks, onTrackClick }) => {
    return (
        <div className="playlist">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Date de création : {creationDate}</p>
            <p>Nombre de musiques : {trackCount}</p>
            <p>Durée totale : {totalDuration}</p>
            {isPublic ? <p>Public</p> : <p>Privé</p>}
        </div>
    )
}

