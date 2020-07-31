import { ManaWallibFunc } from "./ManaWallibFunc";

declare var The$: any;

var scriptForMana = document.createElement("script");
scriptForMana.src = "https://thesapp.onmana.net";
document.head.appendChild(scriptForMana);

(<any>window).TheSAppHybridFuncsReady = TheSAppHybridFuncsReady;

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

function TheSAppHybridFuncsReady(fromWeb = false) {
    console.log("Mana lib : TheSAppHybridFuncsReady " + fromWeb);
    if (fromWeb) {
        func.CheckPlatformByOnline();
    }
    else {
        func.SetRunOnDevice(false);
    }
}

The$(document).ready(function () {
    setTimeout(() => {
        TheSAppHybridFuncsReady(true);
    }, 50);
});