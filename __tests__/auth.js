const request = require("supertest");
const server = require("../api/server");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run;
});
afterAll(async () => {
  await db.destroy();
});

describe("testing auth integration", () => {
  it("registers a user", async () => {
    const newUser = { username: "testing", password: "testing" }
    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("testing");
  });
});
