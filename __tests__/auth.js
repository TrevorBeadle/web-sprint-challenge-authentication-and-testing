const request = require("supertest");
const server = require("../api/server");
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
    const newUser = { username: "testing", password: "testing" };
    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("testing");
    expect(res.body.password).not.toBe(newUser.password);
  });

  it("logs a user in", async () => {
    const user = { username: "johndoe", password: "abc12345" };
    await request(server).post('/api/auth/register').send(user);
    const res = await request(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toBe('welcome, johndoe');
  });
});
