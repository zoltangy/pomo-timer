/// <reference types="cypress" />

describe("E2E tests", () => {
  it("should work in every aspect", () => {
    cy.clock();
    cy.visit("http://localhost:3000/");
    cy.findByRole("button", { name: "start" }).click();
    cy.tick(1000);
    cy.findByText("24:59").should("exist");
    cy.findByRole("tooltip", { name: "0" }).should("exist");
    cy.tick(1000);
    cy.findByText("24:58").should("exist");
    cy.tick(3000);
    cy.findByRole("button", { name: "pause" }).click();
    cy.findByText("WORK").should("exist");
    cy.findByText("24:55").should("exist");
    cy.findByRole("button", { name: "start" }).click();
    cy.tick(60000);
    cy.findByRole("tooltip", { name: "1" }).should("exist");
    cy.findByRole("button", { name: /reset/i }).click();
    cy.findByText("WORK").should("exist");
    cy.findByText("25:00").should("exist");
    cy.findByRole("button", { name: /settings/i }).click();
    cy.findByRole("slider", {
      name: "work",
    }).type("{leftarrow}".repeat(24), {
      force: true,
    });
    cy.findByRole("slider", { name: "short break" }).type("{leftarrow}".repeat(4), {
      force: true,
    });
    cy.findByRole("slider", {
      name: "long break",
    }).type("{leftarrow}".repeat(19), { force: true });
    cy.findByRole("slider", { name: "rounds" }).type("{leftarrow}".repeat(2), { force: true });
    cy.findByText("Work: 1:00").should("exist");
    cy.findByText("Short break: 1:00").should("exist");
    cy.findByText("Long break: 1:00").should("exist");
    cy.findByText("Rounds: 2").should("exist");
    cy.findByRole("button", { name: /save/i }).click();
    // needed for transition animation
    cy.tick(1000);
    cy.findByText("WORK").should("exist");
    cy.findByText("01:00").should("exist");
    cy.findByRole("button", { name: "start" }).click();
    cy.tick(61000);
    cy.findByText("BREAK").should("exist");
    cy.findByText("00:59").should("exist");
    cy.findByRole("tooltip", { name: "1" }).should("exist");
    cy.tick(60000);
    cy.findByText("WORK").should("exist");
    cy.findByText("00:59").should("exist");
    cy.findByRole("tooltip", { name: "2" }).should("exist");
    cy.tick(60000);
    cy.findByText("LONG BREAK").should("exist");
    cy.findByText("00:59").should("exist");
    cy.findByRole("tooltip", { name: "3" }).should("exist");
    cy.findByRole("button", { name: /settings/i }).click();
    cy.findByRole("button", { name: /reset defaults/i }).click();
    cy.findByText("Work: 25:00").should("exist");
    cy.findByText("Short break: 5:00").should("exist");
    cy.findByText("Long break: 20:00").should("exist");
    cy.findByText("Rounds: 4").should("exist");
    cy.findByRole("button", { name: /close settings/i }).click();
    // needed for transition animation
    cy.tick(1000);
    cy.findByText("WORK").should("exist");
    cy.findByText("25:00").should("exist");
    cy.findByRole("tooltip", { name: "0" }).should("exist");
    cy.findByRole("button", { name: "start" }).should("exist");
  });
});
