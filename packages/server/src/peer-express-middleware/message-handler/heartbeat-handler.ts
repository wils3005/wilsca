import Client from "../web-socket-wrapper";

class HeartbeatHandler {
  handle(client: Client | undefined): boolean {
    if (client) {
      const nowTime = new Date().getTime();
      client.setLastPing(nowTime);
    }

    return true;
  }

  handler(): (client: Client | undefined) => boolean {
    return (client: Client | undefined): boolean => this.handle(client);
  }
}

export default HeartbeatHandler;
