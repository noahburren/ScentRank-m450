/// <reference types="cypress" />

describe('ScentRank – Parfumliste & Bewertungen', () => {
  beforeEach(() => {
    // Intercept für das Laden der Parfumliste – robust für jede URL-Variante
    cy.intercept('GET', '**/api/perfumes*', { fixture: 'perfumes.json' }).as('getPerfumes');

    cy.visit('http://localhost:4200');

    // Warten bis die Mock-Daten geladen sind
    cy.wait('@getPerfumes', { timeout: 15000 });
  });

  it('zeigt alle Parfums aus dem Mock an', () => {
    cy.get('.perfume-card', { timeout: 10000 })
      .should('have.length', 3)
      .first()
      .should('contain.text', 'Acqua di Parma Colonia');
  });

  it('zeigt die korrekten Ratings an', () => {
    // Warte, bis kein Platzhalter mehr angezeigt wird
    cy.get('.perfume-card .rating-value', { timeout: 10000 })
      .first()
      .should('not.contain', '—')
      .and('contain', '4.5');

    cy.get('.perfume-card').eq(1)
      .find('.rating-value')
      .should('not.contain', '—')
      .and('contain', '3.0');
  });

  it('bewertet ein Parfum und aktualisiert die Anzeige', () => {
    // POST-Intercept: Benutzer bewertet Parfum #1 mit 5 Sternen
    cy.intercept('POST', '**/api/perfumes/1/rate?stars=5', {
      id: 1,
      name: 'Acqua di Parma Colonia',
      avgRating: 4.8,
      ratingsCount: 11,
    }).as('ratePerfume');

    // Nach Bewertung neue GET-Antwort simulieren
    cy.intercept('GET', '**/api/perfumes*', { fixture: 'perfumes_after_rating.json' }).as('getPerfumesUpdated');

    // Bewertung auslösen
    cy.get('.perfume-card')
      .first()
      .find('.star-button')
      .contains('5★')
      .click();

    cy.wait('@ratePerfume', { timeout: 10000 });
    cy.wait('@getPerfumesUpdated', { timeout: 10000 });

    // Prüfen, ob sich Rating & Anzahl Bewertungen aktualisiert haben
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
