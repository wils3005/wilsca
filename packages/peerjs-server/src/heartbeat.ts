import { Client } from "./client";

export const HeartbeatHandler = (client: Client | undefined): boolean => {
  if (client) {
    const nowTime = new Date().getTime();
    client.setLastPing(nowTime);
  }

  return true;
};
