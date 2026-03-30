import { useState, useEffect } from "react";
import { fetchData } from "../api/fetchLyrics.js"
import { extractCleanedLyrics, extractCompleteVerses } from "../features/match-lyrics/utils/lyricsProcessor.js"
import { LyricInput } from "../features/match-lyrics/components/lyricinput.jsx"
import { SongDisplay } from "../features/match-lyrics/components/songdisplay.jsx"
import { useParams } from "react-router";


/**
 * Handles game logic and visuals.
 * @returns main Game component.
 */
function Game(){

    let id = useParams().id;    // Récupère le paramètre id dans l'URL

    const [guessedWords, setGuessedWords] = useState([]);
    const [lyricsSet, setLyricsSet] = useState(null);
    const [songName, setSongName] = useState("");
	const [guess, setGuess] = useState("");
    const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [verses, setVerses] = useState(null);

    useEffect(() => { // Nécessaire pour se connecter un système externe
        async function fetchLyrics() {
            try {

				setIsLoading(true);
                const song = await fetchData(id);
                const name = song.trackName + ", " + song.artistName;
                const lyrics = extractCleanedLyrics(song);
				const verses = extractCompleteVerses(song);
                setSongName(name);
                setLyricsSet(lyrics);
				setVerses(verses);
                console.log("Successfully loaded data");

            } catch (err) {

                setError("Erreur de chargement des paroles: " + err.message);
				console.log("Error loading data: " + err.message);

            } finally { // quel que soit le résultat

                setIsLoading(false);

            }
        }
        fetchLyrics();
    }, []); // [] pour que ça ne se lance qu'une fois au montage du composant

    return (
        <div>

            {error && <p className="error">{error}</p> }

            <h1> {songName} </h1>

			<LyricInput
				guess={guess}
				setGuess={setGuess}
				guessedWords={guessedWords}
				setGuessedWords={setGuessedWords}
				lyricsSet={lyricsSet}
				isLoading={isLoading}/>
			
            <SongDisplay 
				lyricsSet={lyricsSet}
				guessedWords={guessedWords}
				verses={verses}/>

            <button
                onClick={() => {
                    alert("Votre score est de " + guessedWords.length + " mots trouvés sur " + lyricsSet.size);
                    setGuessedWords(Array.from(lyricsSet));
                }}>
                Afficher le reste des paroles
            </button>
            
        </div>
  )
}

export default Game