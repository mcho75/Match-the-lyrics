export function LyricInput({guessedWords, lyricsSet, setGuessedWords, guess, setGuess, isLoading}){
    // Utilisation des props pour accéder à l'état et aux fonctions de mise à jour du composant parent.
    // -> evite les appels d'une fonction prenant tous ces arguments. 

    if (isLoading){
        return <p>Loading...</p>
    }

    function guessLyric(e) {
        const value = e.target.value;
        setGuess(value);
        const word = value.toLowerCase(); 
        // si on utilise la variable guess au lieu de value, le setguess prend trop de temps et le reste du code est donc réalisé avant que ce soit terminé.

        if (lyricsSet.has(word)){
            if (!guessedWords.includes(word)){
                setGuessedWords([...guessedWords, word]);
                setGuess("");
            }
        }
    }
    return (
        <>
            <div className="input-container">
                <input
                    type="text"
                    value={guess}
                    className="input-lyric"
                    disabled={!lyricsSet} // Désactive l'input tant que les paroles ne sont pas chargées
                    placeholder="Entrer un mot..."
                    onChange={(e) => {guessLyric(e);}}/>
            </div>
        </>
    )
}