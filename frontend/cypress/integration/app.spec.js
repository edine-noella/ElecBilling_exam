before(() => {
  cy.visit("/");
});

describe("Home page", () => {
  it("should open home page and ifnd hero text", () => {
    cy.get("h1").should("contain", "Buy elecricity at the lowest price");
  });

  it("should open buy units and come back", () => {
    cy.contains("Buy units").click();
    cy.url().should("include", "/buy");
    cy.contains("Electri-C").click();
  });

  it("should open check units and come back", () => {
    cy.contains("Check units").click();
    cy.url().should("include", "/check");
    cy.contains("Electri-C").click();
  });
});

describe("Buy page", () => {
  it("Should open buy page and buy new electricity", () => {
    cy.contains("Buy units").click();
    cy.url().should("include", "/buy");
    cy.get("input[name=meter]").type("999999");
    cy.get("input[name=amount]").type("100");
    cy.get("button[type=submit]").click();

    cy.contains("Payment was successfull");
    cy.visit("/");
  });
});

describe("Check page", () => {
  

  it("Should validate meter", () => {
    cy.contains("Check").click();
    cy.get("input[name=meter]").type("99");
    cy.get("button[type=submit]").click();
    cy.contains("Please enter a valid meter ID");
    cy.visit("/");
  });

it("Should check for meter", () => {
    cy.contains("Check").click();
    cy.url().should("include", "/check");
    cy.get("input[name=meter]").type("123456");
    cy.get("button[type=submit]").click();

    cy.contains("Token")
cy.contains("Meter")
        cy.contains("Expires in")
cy.contains("123456")
    cy.visit("/");
  });

});
