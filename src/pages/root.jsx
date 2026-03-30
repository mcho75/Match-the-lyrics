export default function Root() {
    return (
        <>
            <div className="entete">
                <div><img src={"/src/assets/icon.png"} alt={"icon"} height={200}/></div>
                <div><p>Parviendrez-vous à retrouver les paroles ?</p></div>
            </div>

            <div className="description">
                <p>Match the Lyrics est un jeu jouable depuis votre navigateur. Le but du jeu est de retrouver les paroles de la chanson que vous avez sélectionnée, dans leur intégralité.</p>
            </div>
        </>
    )
}