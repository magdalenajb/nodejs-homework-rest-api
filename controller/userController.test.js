const { describe, it } = require("jest");
const request = require("supertest");
const app = require("../app");

const expect = (actual) => {
    return {
        toBe(expected) {
            if (actual === expected) {
                console.log("Pass");
            } else {
                console.error(
                        `Fail. Expected ${expected}, but got ${actual}`
                );
            }
        },
    };
};

describe("User Controller", () => {
    describe("POST /signup", () => {
        it("should create a new user", async () => {
            const response = await request(app)
                .post("/signup")
                .send({
                        email: "test@example.com",
                        password: "testpassword",
                        subscription: "free",
                        token: null,
                })
                .expect(201);

            expect(response.body.status).toBe("success");
            expect(response.body.data.user.email).toBe("test@example.com");
            expect(response.body.data.user.subscription).toBe("free");
        });
    });

    describe("POST /login", () => {
        it("should log in a user", async () => {
            const response = await request(app)
                .post("/login")
                .send({
                        email: "test@example.com",
                        password: "testpassword",
                })
                .expect(200);

            expect(response.body.status).toBe("Success");
            expect(response.body.data.token).toBeDefined();
            expect(typeof response.body.data.user.email).toBe("string");
            expect(typeof response.body.data.user.subscription).toBe(
                "string"
            );
        });
    });
});
