import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("sample");
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  useEffect(() => {
    if (inputValue !== "") {
      QRCode.toString(
        inputValue,
        { type: "svg" },
        function (err: Error | null | undefined, string) {
          if (err === null || err === undefined ? false : Boolean(err))
            throw err as Error;
          setGeneratedQRCode(string);
        }
      );
    }
  }, [inputValue]);
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <img src={`data:image/svg+xml,${encodeURIComponent(generatedQRCode)}`} />
    </>
  );
}

export default App;
