const request = require("supertest");
const app = require("../../app");


describe("GET, genres", () => {
    test("the response code is 200", async () => {

    const response = await request(app)
    .get("/music/genre")

    expect(response.status).toEqual(200);
})});