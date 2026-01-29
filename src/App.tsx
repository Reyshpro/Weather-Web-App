import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import WeatherScreen from "./components/WeatherScreen/WeatherScreen";

function App() {
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady ? (
        <Welcome
          userName={userName}
          city={city}
          onNameChange={setUserName}
          onCityChange={setCity}
          onContinue={() => setIsReady(true)}
        />
      ) : (
        <WeatherScreen userName={userName} city={city} />
      )}
    </>
  );
}

export default App;
