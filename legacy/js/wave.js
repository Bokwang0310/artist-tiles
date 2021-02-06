export const wavesurfer = WaveSurfer.create({
  container: ".waveform",
  waveColor: "violet",
  progressColor: "purple", // played wave color
  cursorColor: "#333", // cursor bar's color
  cursorWidth: 2, // cursor bar's width
  barHeight: 0.8,
  height: 250,
  width: 500,
  barWidth: 5,
  responsive: true,
  barRadius: 2,
  autoCenter: true,
  scrollParent: false,
  hideScrollbar: true,
  barMinHeight: 2,
  normalize: true,
});

wavesurfer.setVolume(0.5);

// http://wavesurfer-js.org/docs/methods.html wavesurfer method api
