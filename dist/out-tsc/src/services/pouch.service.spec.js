import { TestBed } from '@angular/core/testing';
import { PouchService } from './pouch.service';
describe('PouchService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PouchService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=pouch.service.spec.js.map