import Client from "../classes/client";

function main(client: Client | undefined): boolean {
  if (client) {
    const nowTime = new Date().getTime();
    client.setLastPing(nowTime);
  }

  return true;
}

export default main;
