describe('ScentRank – Parfumliste & Bewertungen', () => {
  beforeEach(() => {
    // Backend-Mock
    cy.intercept('GET', '/api/perfumes', { fixture: 'perfumes.json' }).as('getPerfumes');
    cy.visit('http://localhost:4200/perfumes');
    cy.wait('@getPerfumes');
  });

  it('zeigt alle Parfums aus dem Mock an', () => {
    cy.get('.perfume-card', { timeout: 10000 }).should('have.length', 3);
    cy.get('.perfume-card').first().contains('Acqua di Parma Colonia');
  });

  it('zeigt die korrekten Ratings an', () => {
    cy.get('.perfume-card').eq(0)
      .find('.rating-value')
      .invoke('text')
      .should('contain', '4.5');
    cy.get('.perfume-card').eq(1).find('.rating-value').should('contain', '3.0');
  });

  it('bewertet ein Parfum und aktualisiert die Anzeige', () => {
    // Neues Rating simulieren
    cy.intercept('POST', '/api/perfumes/1/rate?stars=5', {
      id: 1,
      name: 'Acqua di Parma Colonia',
      avgRating: 4.8,
      ratingsCount: 11
    }).as('ratePerfume');

    // Nach der Bewertung holt sich die Komponente ja wieder die Liste neu
    cy.intercept('GET', '/api/perfumes', { fixture: 'perfumes_after_rating.json' }).as('getPerfumesUpdated');

    cy.get('.perfume-card').first().find('.star-button').contains('5★').click();
    cy.wait('@ratePerfume');
    cy.wait('@getPerfumesUpdated');

    cy.get('.perfume-card').first().find('.rating-value').should('contain', '4.8');
    cy.get('.perfume-card').first().find('.rating-count').should('contain', '11 Bewertung');
  });
});
