import { alertSound } from "../assets";
export const soundMap = {
  1: alertSound,
};
export const handleAudioPlay = async (soundAlert: number) => {
  const audio = new Audio(setSoundForAlarm(soundAlert));

  try {
    console.log("played");
    await audio.play();
  } catch (error) {
    console.log("error");
  }

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
};

export const setSoundForAlarm = (soundAlert: number) => {
  const selectedSound = soundMap[soundAlert as keyof typeof soundMap];
  return selectedSound ? selectedSound : undefined;
};
