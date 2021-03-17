import webRTCAdapter from "webrtc-adapter";

export const Supports = new (class {
  readonly isIOS = ["iPad", "iPhone", "iPod"].includes(navigator.platform);
  readonly supportedBrowsers = ["firefox", "chrome", "safari"];

  readonly minFirefoxVersion = 59;
  readonly minChromeVersion = 72;
  readonly minSafariVersion = 605;

  isWebRTCSupported(): boolean {
    return typeof RTCPeerConnection !== "undefined";
  }

  isBrowserSupported(): boolean {
    const browser = this.getBrowser();
    const version = this.getVersion();

    const validBrowser = this.supportedBrowsers.includes(browser);

    if (!validBrowser) return false;

    if (browser === "chrome") return version >= this.minChromeVersion;
    if (browser === "firefox") return version >= this.minFirefoxVersion;
    if (browser === "safari")
      return !this.isIOS && version >= this.minSafariVersion;

    return false;
  }

  getBrowser(): string {
    return webRTCAdapter.browserDetails.browser;
  }

  getVersion(): number {
    return webRTCAdapter.browserDetails.version || 0;
  }

  isUnifiedPlanSupported(): boolean {
    const browser = this.getBrowser();
    const version = webRTCAdapter.browserDetails.version || 0;

    if (browser === "chrome" && version < 72) return false;
    if (browser === "firefox" && version >= 59) return true;
    if (
      !window.RTCRtpTransceiver ||
      !("currentDirection" in RTCRtpTransceiver.prototype)
    )
      return false;

    let supported = false;

    const tempPc = new RTCPeerConnection();
    tempPc.addTransceiver("audio");
    supported = true;

    tempPc.close();
    return supported;
  }

  toString(): string {
    return `Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${String(this.isIOS)}
    isWebRTCSupported:${String(this.isWebRTCSupported())}
    isBrowserSupported:${String(this.isBrowserSupported())}
    isUnifiedPlanSupported:${String(this.isUnifiedPlanSupported())}`;
  }
})();
