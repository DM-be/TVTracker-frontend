import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
describe('MovieService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MovieService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=movie.service.spec.js.map