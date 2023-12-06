import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "./server";

chai.use(chaiHttp);

describe("API connected", () => {
  it("it sends a welcome message", async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(200);
    expect(res.body.status).to.equals("success");
    expect(res.body.message).to.equals("Football API");
  });
});
