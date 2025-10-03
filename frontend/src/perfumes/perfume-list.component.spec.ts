import { render, screen, fireEvent } from '@testing-library/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PerfumeListComponent } from './perfume-list.component';

describe('PerfumeListComponent', () => {
  it('zeigt Liste und erlaubt Rating', async () => {
    const { fixture } = await render(PerfumeListComponent, {
      imports: [HttpClientTestingModule]
    });
    const http = fixture.debugElement.injector.get(HttpTestingController);

    http.expectOne('/api/perfumes')
      .flush([{ id: 1, name: 'Naxos', avgRating: 0, ratingsCount: 0 }]);

    expect(await screen.findByText('Naxos')).toBeTruthy();

    fireEvent.click(screen.getByText('5★'));
    http.expectOne('/api/perfumes/1/rate?stars=5')
      .flush({ id: 1, name: 'Naxos', avgRating: 5, ratingsCount: 1 });
    http.expectOne('/api/perfumes')
      .flush([{ id: 1, name: 'Naxos', avgRating: 5, ratingsCount: 1 }]);

    expect(await screen.findByText(/Ø 5/)).toBeTruthy();
    http.verify();
  });
});
