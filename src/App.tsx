import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

/**
 * Generate QR code image from string
 * @param param0 string to be converted to QR code
 * @returns QR code image
 */
function GenerateQRCodeImage({
  inputValue,
  style,
}: {
  inputValue: string;
  style: React.CSSProperties;
}): JSX.Element {
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
      <img
        src={`data:image/svg+xml,${encodeURIComponent(generatedQRCode)}`}
        style={style}
      />
    </>
  );
}

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("sample");
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" flexGrow={1}>
            QR Code Generator
          </Typography>
          <IconButton
            color="inherit"
            aria-label="GitHub repository"
            size="large"
          >
            <GitHubIcon
              fontSize="inherit"
              href="git@github.com:chvmvd/qrcode.git"
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box m={2}>
        <Stack spacing={0.5} direction="column">
          <Typography variant="h6" component="p">
            Enter the text to be converted to a QR code here.
          </Typography>
          <TextField
            variant="outlined"
            error={inputValue === ""}
            helperText={
              inputValue === "" ? "Please enter a text to be converted." : ""
            }
            multiline
            maxRows={4}
            fullWidth
            sx={{ maxWidth: 600 }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </Stack>
        <GenerateQRCodeImage
          inputValue={inputValue}
          style={{ maxWidth: "600px" }}
        />
      </Box>
    </>
  );
}

export default App;
