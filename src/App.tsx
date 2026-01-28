import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";

function App() {
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isSubmitted) {
    return (
      <Welcome
        userName={userName}
        city={city}
        onNameChange={setUserName}
        onCityChange={setCity}
        onContinue={() => setIsSubmitted(true)}
      />
    );
  }

  return <div>Weather Screen Here 🌤️</div>;
}

export default App;
