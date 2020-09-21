// cpu memory leak doesn't seem possible anymore on modern browser
// this is supposed to start a gpu memory leak though
// see https://stackoverflow.com/a/63252159/1665540
export default ({ interval, timeout }) => {
  // Initialize canvas and its context
  window.reallyFatCanvas = document.createElement("canvas");
  let context = window.reallyFatCanvas.getContext("2d");

  // References new context inside context, in loop.
  const leakingLoop = () => {
    context.canvas.width = document.body.clientWidth;
    context.canvas.height = document.body.clientHeight;
    const newContext = document.createElement("canvas").getContext("2d");
    context.context = newContext;
    context.drawImage(newContext.canvas, 0, 0);

    // The new context will reference another context on the next loop
    context = newContext;
  };

  const intervalHandle = setInterval(leakingLoop, interval || 10);

  setTimeout(() => {
    clearInterval(intervalHandle);
  }, timeout || 3000);
};
