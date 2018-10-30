import { AdsState } from '../../ads-state';
import AdsVideoHandler from '../../ads-video-handler';

let padding = '    ';

describe('** onendedEventHandler **', () => {
    let lib: AdsVideoHandler;
    
    beforeEach(() => {
        let dummyVideoElement = document.createElement('video');
        spyOn(document, 'getElementById').and.returnValue(dummyVideoElement);
        spyOn(console, "log");
    });

    describe(`${padding}When the ads video finish:`, () => {

        beforeEach(() => {
            lib = new AdsVideoHandler('my-ads-video');
        });

        it(`${padding}Should have state equal Finished`, () => {
            lib.state = AdsState.Started;
            lib.onendedEventHandler();
            expect(AdsState[lib.state]).toEqual(AdsState[AdsState.Finished]);
        });

        it(`${padding}Should have console log message "Video progress has Passed 100%."`, () => {
            lib.state = AdsState.Started;
            lib.onendedEventHandler();
            expect(console.log).toHaveBeenCalledWith('Video progress has Passed 100%.');
        });
    });
});