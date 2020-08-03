// import "./css/panda.css";
// import "./css/styles.css";
// import "./dist/css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";
import { Col, Container, Row } from "react-bootstrap";
import { MyNavbar } from "./navbar";
import React from "react";
import ReactDOM from "react-dom";

const { hostname } = window.location;
const webSocket = new WebSocket("ws://localhost:8080");

const isLocalhost = Boolean(
  hostname === "localhost" ||
    hostname === "[::1]" ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.exec(hostname)
);

const element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const container = document.querySelector("#root");

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

////////////////////////////////////////////////////////////////////////////////
// functions
export function App(): JSX.Element {
  return (
    <Container>
      <MyNavbar />
      <Row>
        <Col>
          <p>
            The smartest way to <br />
            train your team and <br />
            partner agents
          </p>
          <p>
            Panda provides agents with
            <span>one powerful platform</span> to access all the sales
            trainings, marketing materials, admissions procedures and policies
            of
            <span>all the participating schools they represent.</span>
          </p>
          <form
            action="https://pandaportal.co/index.php/register"
            method="post"
          >
            <input
              type="hidden"
              name="_token"
              value="xtI4s0Xq2I2ZqP2ESa35yxs3jQX7eNCbpUO40kLx"
            />{" "}
            <div>
              <input
                type="email"
                placeholder="Write your E-mail"
                name="email"
                id="email"
                required
              />
            </div>
            <div>
              <button type="submit">GET STARTED FOR FREE</button>
            </div>
          </form>
        </Col>
        <Col>
          <img
            src="https://pandaportal.co/assets/images/frontend/web.png"
            alt=""
          />

          <iframe
            src="https://player.vimeo.com/video/427895932?color=EED429&amp;byline=0&amp;portrait=0"
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            id="panda-iframe-video-home"
            title="vimeo"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
}

export function handleOpen(this: WebSocket, event: Event): void {
  console.info({ this: this, event });
  this.send("Hello Server!");
}

export function register(config?: Config): void {
  if (
    process.env.REACT_APP_NODE_ENV === "production" &&
    "serviceWorker" in navigator
  ) {
    const publicUrl = new URL(
      String(process.env.REACT_APP_PUBLIC_URL),
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${String(
        process.env.REACT_APP_PUBLIC_URL
      )}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready
          .then(() => {
            console.log(
              "This web app is being served cache-first by a service " +
                "worker. To learn more, visit https://bit.ly/CRA-PWA"
            );
          })
          .catch(handleError);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

export function registerValidSW(swUrl: string, config?: Config): void {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) return;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://bit.ly/CRA-PWA."
              );

              if (config && config.onUpdate) config.onUpdate(registration);
            } else {
              console.log("Content is cached for offline use.");
              if (config && config.onSuccess) config.onSuccess(registration);
            }
          }
        };
      };
    })
    .catch(handleError);
}

export function handleError(error: Error): void {
  console.error({ error });
}

export function checkValidServiceWorker(swUrl: string, config?: Config): void {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration
              .unregister()
              .then(() => {
                window.location.reload();
              })
              .catch(handleError);
          })
          .catch(handleError);
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().catch(handleError);
      })
      .catch(handleError);
  }
}

export function handleMessage(
  this: WebSocket,
  eventMessage: MessageEvent
): void {
  console.log("Message from server: ", eventMessage.data);
}

////////////////////////////////////////////////////////////////////////////////
// effects
webSocket.addEventListener("open", handleOpen);
webSocket.addEventListener("message", handleMessage);
ReactDOM.render(element, container);
unregister();
