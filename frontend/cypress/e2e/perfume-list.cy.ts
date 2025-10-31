/// <reference types="cypress" />

describe('ScentRank – Parfumliste & Bewertungen', () => {
  beforeEach(() => {
    // Intercept für jede Host-Variante (127.0.0.1 ODER localhost)
    cy.intercept('GET', /\/api\/perfumes(\?.*)?$/, { fixture: 'perfumes.json' }).as('getPerfumes');

    cy.visit('http://127.0.0.1:4200'); // gleiche Domain wie im CI-Server

    cy.wait('@getPerfumes', { timeout: 15000 });
  });

  it('zeigt alle Parfums aus dem Mock an', () => {
    cy.get('.perfume-card', { timeout: 10000 })
      .should('have.length', 3)
      .first()
      .should('contain.text', 'Acqua di Parma Colonia');
  });

  it('zeigt die korrekten Ratings an', () => {
    cy.get('.perfume-card .rating-value', { timeout: 10000 })
      .first()
      .should('not.contain', '—')
      .and('contain', '4.5');

    cy.get('.perfume-card').eq(1)
      .find('.rating-value')
      .should('contain', '3.0');
  });

  it('bewertet ein Parfum und aktualisiert die Anzeige', () => {
    cy.intercept('POST', '**/api/perfumes/1/rate?stars=5', {
      id: 1,
      name: 'Acqua di Parma Colonia',
      avgRating: 4.8,
      ratingsCount: 11,
    }).as('ratePerfume');

    cy.intercept('GET', /\/api\/perfumes(\?.*)?$/, { fixture: 'perfumes_after_rating.json' }).as('getPerfumesUpdated');

    cy.get('.perfume-card')
      .first()
      .find('.star-button')
      .contains('5★')
      .click();

    cy.wait('@ratePerfume', { timeout: 10000 });
    cy.wait('@getPerfumesUpdated', { timeout: 10000 });

    cy.get('.perfume-card').first().find('.rating-value').should('contain', '4.8');
    cy.get('.perfume-card').first().find('.rating-count').should('contain', '11 Bewertung');
  });
});
