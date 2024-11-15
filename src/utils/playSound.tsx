import { alertSound } from "../assets";

export const soundMap = {
  1: alertSound,
};

export const handleAudioPlay = async (soundAlert: number) => {
  const audio = new Audio(setSoundForAlarm(soundAlert));

  await audio.play();

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
};

const setSoundForAlarm = (soundAlert: number) => {
  const selectedSound = soundMap[soundAlert as keyof typeof soundMap];
  return selectedSound ? selectedSound : undefined;
};
