const { host, hostname } = window.location;

const isLocalhost = Boolean(
  hostname === "localhost" ||
    hostname === "[::1]" ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.exec(hostname)
);
interface IConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

unregister();

export function handleError(error: Error): void {
  console.error({ error });
}

export function register(config?: IConfig): void {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(host, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${host}/service-worker.js`;

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

export function registerValidSW(swUrl: string, config?: IConfig): void {
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

export function checkValidServiceWorker(swUrl: string, config?: IConfig): void {
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
