import { AdsState } from '../../ads-state';
import AdsVideoHandler from '../../ads-video-handler';

let padding = '    ';

describe('** continuesPlayingTimeMonator **', () => {
    let lib: AdsVideoHandler;
    beforeEach(() => {
        let dummyVideoElement = document.createElement('video');
        spyOn(document, 'getElementById').and.returnValue(dummyVideoElement);
        spyOn(console, "log");
    });

    describe(`${padding}When the ads video start playing for 2 continues seconds:`, () => {

        beforeEach(() => {

            jasmine.clock().install();
            lib = new AdsVideoHandler('my-ads-video');
        });

        afterEach(() => {
            jasmine.clock().uninstall();
        });

        it(`${padding}Should log message to the browser console after 2 continues seconds`, () => {
            lib.continuousTime = 2;
            lib.continuesPlayingTimeMonator();

            expect(console.log).not.toHaveBeenCalled();
            jasmine.clock().tick(2001);
            expect(console.log).toHaveBeenCalled();
        });
    });
});