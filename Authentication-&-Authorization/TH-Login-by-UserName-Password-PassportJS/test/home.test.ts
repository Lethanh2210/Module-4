import request from "supertest";

import app from "../index";

import bookRoutes from "../src/router/book.router";



describe("Test the root path", () => {

    test("It should response the GET method", async () => {

        const response = await request(app).get("/123");

        expect(response.statusCode).toEqual(400);

    });

    test("It should response the GET method", async () => {

        const response = await request(bookRoutes).get("/list");

        expect(response.statusCode).toEqual(200);

    });

});