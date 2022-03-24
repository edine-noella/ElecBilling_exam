import { createTestServer } from "../../utils/test-utils";
import { request } from "undici";

const { serverURL } = createTestServer();

const tokenStructure = {
  id: expect.any(Number),
  token: expect.any(String),
  meter: expect.any(String),
  amount: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  expiresAt: expect.any(String),
  status: expect.any(Boolean),
};

describe("Token api", () => {
  describe("GET /api/tokens", () => {
    it("should return all tokens", async () => {
      const { statusCode, body, headers } = await request(
        `${serverURL}/api/tokens`
      );

      const parsedBody = await body.json();

      expect(statusCode).toBe(200);
      expect(headers["content-type"]).toMatch(/application\/json/);

      for (const token of parsedBody) {
        expect(token).toMatchObject(tokenStructure);
      }
    });
  });

  describe("GET /api/tokens/:id", () => {
    it.skip("should find token by id", async () => {});
  });

  describe("POST /api/tokens", () => {
    it("should create token and return back token created", async () => {
      const { statusCode, body } = await request(`${serverURL}/api/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meter: "123456",
          amount: "100",
        }),
      });

      const resBody = await body.json();

      expect(statusCode).toBe(201);

      expect(resBody).toMatchObject(tokenStructure);
    });
  });
});
