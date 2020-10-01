var scriptForMana = document.createElement("script");
scriptForMana.src = "manajs://manamobile.js";
document.head.appendChild(scriptForMana);

var scriptForBrowser = document.createElement("script");
scriptForBrowser.src = "https://manadevfrom.blob.core.windows.net/zips/manaonline.js";
document.head.appendChild(scriptForBrowser);

(<any>window).TheSAppHybridFuncsReady = TheSAppHybridFuncsReady;

function TheSAppHybridFuncsReady(fromWeb = false) {
    console.log("Mana lib : TheSAppHybridFuncsReady fromweb is " + fromWeb);
    if ((<any>window).TheSHybridFunc){ func.SetDeviceCheckpoint(false); return;};
    if (fromWeb) {
        setTimeout(() => {
            if (!(<any>window).TheSHybridFunc) {
                if ((<any>window).TheSHybridFunc){ func.SetDeviceCheckpoint(false); return;};
                func.SetDeviceCheckpoint(fromWeb);
            }
        }, 80);
    }
    else func.SetDeviceCheckpoint(fromWeb);
}

import { ManaWallibFunc } from "./ManaWallibFunc";

declare var The$: any;

const titleTextId = "#appTitleText";

var func = new ManaWallibFunc();

func.hideContent();

export function GetLib() {
    return func.GetLib();
}

export function GetCustomTitle() {
    var title = The$(titleTextId).text();
    return title;
}

export function GetBootstrapTitle(): string {
    var title = The$("nav .navbar-brand").text();
    return title;
}