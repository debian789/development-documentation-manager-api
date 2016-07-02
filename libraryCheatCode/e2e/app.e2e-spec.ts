import { LibraryCheatCodePage } from './app.po';

describe('library-cheat-code App', function() {
  let page: LibraryCheatCodePage;

  beforeEach(() => {
    page = new LibraryCheatCodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
