import { BidmotionPage } from './app.po';

describe('bidmotion App', function() {
  let page: BidmotionPage;

  beforeEach(() => {
    page = new BidmotionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
