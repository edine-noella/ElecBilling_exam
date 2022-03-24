before(() => {
  cy.visit("/");
});

describe("Home page", () => {
  it("should open home page and ifnd hero text", () => {
    cy.get("h1").should("contain", "Buy elecricity at the lowest price");
  });
});
