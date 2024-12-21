// import reactLogo from "./assets/react.svg";
// can i also access it using /assets/react.svg? ==> yea, /src/assets/react.svg
//
// so virtually react fills the public/ folder with all items, so now it can be accessed from any url
//
// import viteLogo from "/vite.svg";
// importing from public directory

import ArtGallery from "./components/ArtGallery/ArtGallery";
import "./App.css";

function App() {
    return (
        <>
            <ArtGallery />;
        </>
    );
}

export default App;
