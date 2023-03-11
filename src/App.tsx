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
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

/**
 * Generate string of the SVG of a QR code
 * @param inputValue string to be converted to QR code
 * @returns string of the SVG of a QR code
 */
function GenerateQRCodeString(inputValue: string): string {
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
  return generatedQRCode;
}

/**
 * Generate QR code image from string
 * @param param0 props
 * @param param0.inputValue string to be converted to QR code
 * @param param0.style style of the image
 * @returns QR code image
 */
function GenerateQRCodeImage({
  inputValue,
  style,
}: {
  inputValue: string;
  style: React.CSSProperties;
}): JSX.Element {
  const generatedQRCode = GenerateQRCodeString(inputValue);
  return (
    <>
      <img
        src={`data:image/svg+xml,${encodeURIComponent(generatedQRCode)}`}
        style={style}
      />
    </>
  );
}

/**
 * Download button
 * @param param0 props
 * @param param0.inputValue string to be converted to QR code
 * @returns download button
 */
function DownloadButton({ inputValue }: { inputValue: string }): JSX.Element {
  const generatedQRCode = GenerateQRCodeString(inputValue);
  return (
    <>
      <Button
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={() => {
          const a = document.createElement("a");
          a.href = `data:image/svg+xml,${encodeURIComponent(generatedQRCode)}`;
          a.download = "QRCode.svg";
          a.click();
        }}
      >
        Download
      </Button>
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
              href="https://github.com/chvmvd/qrcode-generator/"
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
        <DownloadButton inputValue={inputValue} />
      </Box>
    </>
  );
}

export default App;
