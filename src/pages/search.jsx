import { searchSongs } from "../api/searchSongs.js"
import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Search() {

    let query = useParams().query;
    
    const [songsList, setSongsList] = useState([]);
    const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
    const [trackName, setTrackName] = useState(query.split("&")[0] || "");
    const [artistName, setArtistName] = useState(query.split("&")[1] || "");

    useEffect(() => {
        async function fetchSongs() {
            try {
            
                setIsLoading(true);
                const songs = await searchSongs(query);
                setSongsList(songs);

            } catch (err) {
            
                setError("Error loading data: " + err.message);
                console.log("Error loading data: " + err.message);

            } finally { // quel que soit le résultat

                setIsLoading(false);
            }
        }
        fetchSongs();
    }, []);

    const inputTrack = <input type="text" value={trackName} onChange={(e) => setTrackName(e.target.value)} placeholder="Rechercher dans le nom..."/>;
    const inputArtist = <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Rechercher par artiste..."/>;

    return (
        <div>

            <form>
                <label>Titre :</label>
                {inputTrack}
                <label>Artiste :</label>
                {inputArtist}
            </form>

            <button
                onClick={() => {
                    if (trackName == "" && artistName == "") {
                        alert("La recherche ne peut pas être vide.");
                    } else {
                    window.location.href="/search/"+trackName+"&"+artistName
                    }}}
                className="search-button">
                Lancer la recherche
            </button>

            {songsList.length ? (    // Si il y a des chansons
                <div className="song-list">
                    {songsList.map((song) => (    // On crée une liste de chansons à partir du tableau songs

                        <div
                            className="song-card"
                            key={song.id}
                            onClick={() => window.location.href = `../song/${song.id}`}>
                                <p className="track-name">{song.trackName}</p>
                                <p className="album-name">{song.albumName}</p>
                                <p className="artist-name">{song.artistName}</p>
                        </div>
                    
                    ))}
                </div>
            ) : (   // Si il n'y a pas de chansons on affiche qu'il n'y en a pas
                <p>
                    <i> La recherche n'a retourné aucun résultat </i>
                </p>
            )}

        </div>
    )
}