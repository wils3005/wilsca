import "./favicon.ico";
import "./index.html";
import "./main.css";
import "./nicole-robicheau-field.jpg";
import "./nicole-robicheau-headshot.jpg";

class Main {}

globalThis.onload = () => Object.assign(globalThis, { app: new Main() });

export { Main };
