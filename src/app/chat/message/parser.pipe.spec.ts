import { ParserPipe } from './parser.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { TestBed, inject } from '@angular/core/testing';

describe('ParserPipe', () => {
  let pipe: ParserPipe;
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      })
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new ParserPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }))

  it('create an embed iframe for given youtube link ', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new ParserPipe(domSanitizer);
    expect(pipe.transform('https://www.youtube.com/watch?v=HhFTXYB69pw')).toContain('<iframe src="https://www.youtube.com/embed/${url.match(youtube)[1]}" frameborder="0" allowfullscreen></iframe>');
  }));
});
