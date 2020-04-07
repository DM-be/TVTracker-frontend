import { AppPage } from './app.po';
describe('new App', function () {
    var page;
    beforeEach(function () {
        page = new AppPage();
    });
    it('should display welcome message', function () {
        page.navigateTo();
        expect(page.getPageTitle()).toContain('Tab One');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map