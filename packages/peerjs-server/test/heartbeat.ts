import { expect } from "chai";
import { Client } from "../src/client";
import { HeartbeatHandler } from "../src/handlers";

describe("Heartbeat handler", () => {
  it("should update last ping time", () => {
    const client = new Client({ id: "id", token: "" });
    client.setLastPing(0);

    const nowTime = new Date().getTime();

    HeartbeatHandler(client);

    expect(client.getLastPing()).to.be.closeTo(nowTime, 2);
  });
});
