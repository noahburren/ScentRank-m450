/// <reference types="cypress" />

describe('ScentRank – Parfumliste & Bewertungen', () => {
  beforeEach(() => {
    // 1️⃣ Intercept MUSS aktiv sein, bevor Angular lädt
    cy.intercept('GET', '/api/perfumes', { fixture: 'perfumes.json' }).as('getPerfumes');

    // 2️⃣ Seite aufrufen (Angular routed intern auf /perfumes)
    cy.visit('http://localhost:4200/perfumes');

    // 3️⃣ Auf den Mock warten (max. 10s, weil CI manchmal lahm ist)
    cy.wait('@getPerfumes', { timeout: 10000 });
  });

  it('zeigt alle Parfums aus dem Mock an', () => {
    cy.get('.perfume-card', { timeout: 10000 })
      .should('have.length', 3)
      .first()
      .should('contain.text', 'Acqua di Parma Colonia');
  });

  it('zeigt die korrekten Ratings an', () => {
    cy.get('.perfume-card').eq(0)
      .find('.rating-value')
      .invoke('text')
      .should('contain', '4.5');

    cy.get('.perfume-card').eq(1)
      .find('.rating-value')
      .invoke('text')
      .should('contain', '3.0');
  });

  it('bewertet ein Parfum und aktualisiert die Anzeige', () => {
    // 1️⃣ POST intercepten (Bewertung)
    cy.intercept('POST', '/api/perfumes/1/rate?stars=5', {
      id: 1,
      name: 'Acqua di Parma Colonia',
      avgRating: 4.8,
      ratingsCount: 11,
    }).as('ratePerfume');

    // 2️⃣ Zweiten GET abfangen (nach Bewertung)
    cy.intercept('GET', '/api/perfumes', { fixture: 'perfumes_after_rating.json' }).as('getPerfumesUpdated');

    // 3️⃣ User-Aktion simulieren
    cy.get('.perfume-card')
      .first()
      .find('.star-button')
      .contains('5★')
      .click();

    // 4️⃣ Auf beide Requests warten (mit großzügigem Timeout)
    cy.wait('@ratePerfume', { timeout: 10000 });
    cy.wait('@getPerfumesUpdated', { timeout: 10000 });

    // 5️⃣ Neue Werte prüfen
    cy.get('.perfume-card')
      .first()
      .find('.rating-value')
      .should('contain', '4.8');

    cy.get('.perfume-card')
      .first()
      .find('.rating-count')
      .should('contain', '11 Bewertung');
  });
});
