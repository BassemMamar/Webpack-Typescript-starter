import { AdsState } from '../../ads-state';
import AdsVideoHandler from '../../ads-video-handler';

let padding = '    ';

describe('** Helper **', () => {
    let lib: AdsVideoHandler;

    beforeEach(() => {

        let dummyVideoElement = document.createElement('video');
        spyOn(document, 'getElementById').and.returnValue(dummyVideoElement);
        spyOn(console, "log");
    });

    describe(`${padding}When the ads video is playing and progress time updates:`, () => {

        beforeEach(() => {
            lib = new AdsVideoHandler('my-ads-video');
        });

        describe(`${padding}When time >= 25% and < 50% && current state is NOT Passed25`, () => {
            let currentPercentage = 30;
            it(`${padding}Should have state equal Passed25`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(AdsState[lib.state]).toEqual(AdsState[AdsState.Passed25]);
            });

            it(`${padding}Should have console log message "Video progress has Passed 25%."`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(console.log).toHaveBeenCalledWith('Video progress has Passed 25%.');
            });
        });

        describe(`${padding}When time >= 50% and < 75% && current state is NOT Passed50`, () => {
            let currentPercentage = 60;
            it(`${padding}Should have state equal Passed50`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(AdsState[lib.state]).toEqual(AdsState[AdsState.Passed50]);
            });

            it(`${padding}Should have console log message "Video progress has Passed 50%."`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(console.log).toHaveBeenCalledWith('Video progress has Passed 50%.');
            });
        });

        describe(`${padding}When time >= 75% and < 50% && current state is NOT Passed75`, () => {
            let currentPercentage = 90;
            it(`${padding}Should have state equal Passed75`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(AdsState[lib.state]).toEqual(AdsState[AdsState.Passed75]);
            });

            it(`${padding}Should have console log message "Video progress has Passed 75%."`, () => {
                lib.state = AdsState.Started;
                lib.checkTimeProgressPercentageChanges(currentPercentage);
                expect(console.log).toHaveBeenCalledWith('Video progress has Passed 75%.');
            });
        });
    });
});