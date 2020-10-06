import { ManaFactory } from '../src/ManaFactory';
import { ManaWallibFunc } from '../src/ManaWallibFunc';
import { JSDOM } from 'jsdom';
import { ManaRestService } from '../src/ManaRestService';
import { ManaNativeService } from '../src/ManaNativeService';

const dom = new JSDOM("<!DOCTYPE html><html><head><script src='../src/theSjquery-slim.js'></script></head></html>", {
    url: "https://example.org/",
    contentType: "text/html",
});

(<any>global).document = dom.window.document;
(<any>global).window = dom.window;

describe("ManaFactory define device is mana or browser", () => {
    afterEach(() => {
        (<any>global).window.TheSHybridFunc = undefined;
    });

    it('When SetDeviceIsBrowser with true then GetManaLib it should be ManaRestService', async () => {
        var fac = new ManaFactory();
        fac.SetDeviceIsBrowser(true);
        var lib = await fac.GetManaLib();
        expect(lib.constructor.name).toBe(ManaRestService.name);
    })

    it('When SetDeviceIsBrowser with false then GetManaLib it should be ManaNativeService', async () => {
        (<any>global).window.TheSHybridFunc = true;
        var fac = new ManaFactory();
        fac.SetDeviceIsBrowser(false);
        var lib = await fac.GetManaLib();
        expect(lib.constructor.name).toBe(ManaNativeService.name);
    })

    it('When set device run on Mana and set device run on browser again device must be Mana', async () => {
        (<any>global).window.TheSHybridFunc = true;
        var manaFunc = new ManaWallibFunc();
        manaFunc.SetDeviceCheckpoint(false);
        manaFunc.SetDeviceCheckpoint(true);
        var lib = await manaFunc.GetLib();
        expect(lib.constructor.name).toBe(ManaNativeService.name);
    })

    it('When set device run on browser and set device run on Mana it must be call reload page', () => {
        (<any>global).window.TheSHybridFunc = true;
        var manaFunc = new ManaWallibFunc();
        spyOn<any>(manaFunc, "ReloadPage");
        manaFunc.SetDeviceCheckpoint(true);
        manaFunc.SetDeviceCheckpoint(false);
        expect((<any>manaFunc).ReloadPage).toHaveBeenCalledTimes(1);
    });

    it('When set device run on Mana and set device run on Mana fac.SetDeviceIsBrowser must call once time', () => {
        (<any>global).window.TheSHybridFunc = true;
        var manaFunc = new ManaWallibFunc();
        spyOn<any>((<any>manaFunc).fac, "SetDeviceIsBrowser");
        manaFunc.SetDeviceCheckpoint(false);
        manaFunc.SetDeviceCheckpoint(false);
        expect((<any>manaFunc).fac.SetDeviceIsBrowser).toHaveBeenCalledTimes(1);
    });
});