import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AppTheme from "../theme/AppTheme";
import { MapComponent } from "../components/MapComponent";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { alertSound } from "../assets";

export const MapPage = (props: { disableCustomTheme?: boolean }) => {
  // const [text, setText] = React.useState("Вам пришло уведомление");
  const [alert, setAlert] = useState("");
  const alert1 = new Audio(alertSound);
  const [audio] = useState(alert1);

  const lastAlertTime = useRef(0);
  useEffect(() => {
    handleAudioPlay();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [alert1]);

  const handleAudioPlay = async () => {
    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started.");
          })
          .catch(() => {
            console.error("Playback failed:");
          });
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    const now = Date.now();

    if (alert && now - lastAlertTime.current >= 5000) {
      handleAudioPlay();
      lastAlertTime.current = now;
    }
  }, [alert]);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://10.20.0.76:8080/ws",
      reconnectDelay: 200,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    client.activate();
    client.onConnect = () => {
      client.subscribe("/topic/test", (e) => {
        console.log("Received message", JSON.parse(e.body));

        if (e.body) {
          setAlert(e.body);
        }
      });
    };

    return () => {
      client.deactivate();
    };
  }, []);

  // const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  // const [selectedVoice, setSelectedVoice] =
  //   useState<SpeechSynthesisVoice | null>(null);

  // useEffect(() => {
  //   const speechSynthesis = window.speechSynthesis;

  //   const updateVoices = () => {
  //     const availableVoices = speechSynthesis.getVoices();
  //     console.log(availableVoices, "availableVoices");
  //     const russianVoices = availableVoices.filter(
  //       (voice) => voice.voiceURI === "Google русский"
  //     );
  //     setVoices(russianVoices);
  //     if (russianVoices.length > 0) {
  //       setSelectedVoice(russianVoices[0]);
  //     }
  //   };

  //   speechSynthesis.onvoiceschanged = updateVoices;
  //   updateVoices();
  // }, []);

  // const speak = () => {
  //   if (text && selectedVoice) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.voice = selectedVoice;
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     alert("Введите текст для воспроизведения.");
  //   }
  // };
  // React.useEffect(() => {
  //   speak();
  // }, [text]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        {/* <ColorModeIconDropdown /> */}
      </Box>

      <Button onClick={() => audio?.play()}>qqqqq</Button>
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 6, sm: 3, lg: 1 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        ></Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <MapComponent />

          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          ></Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
};
