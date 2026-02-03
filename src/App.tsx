import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import WeatherScreen from "./components/WeatherScreen/WeatherScreen";

function App() {
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [isReady, setIsReady] = useState(false);

  const isValidName = (name: string) => {
    const trimmed = name.trim();
    const nameRegex = /^[A-Za-z\s]+$/;

    return (
      trimmed.length >= 2 &&
      trimmed.length <= 25 &&
      nameRegex.test(trimmed)
    );
  };

  return (
    <>
      {!isReady ? (
        <Welcome
          userName={userName}
          city={city}
          onNameChange={setUserName}
          onCityChange={setCity}
          onContinue={() => setIsReady(true)}
          isNameValid={isValidName(userName)} 
        />
      ) : (
        <WeatherScreen userName={userName} city={city} />
      )}
    </>
  );
}

export default App;
