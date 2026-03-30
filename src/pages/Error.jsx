import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();    // Accède à l'erreur renvoyée quand on n'a pas réussi à accéder à la page
    console.error(error);

    return (
        <div id="error-page">
            <h1 className="error">
                {error.status + " " + (error.statusText || error.message)}
            </h1>
            <p> Une erreur inattendue s'est produite. </p>
        </div>
    );
}





