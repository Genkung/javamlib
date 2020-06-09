import { ManaWallibFunc } from "./ManaWallibFunc";

declare var The$: any;

var scriptForMana = document.createElement("script");
scriptForMana.src = "https://thesapp.onmana.net";
document.head.appendChild(scriptForMana);

const titleName = "Lib v1.9.0";

(<any>window).TheSAppHybridFuncsReady = TheSAppHybridFuncsReady;


const titleTextId = "#appTitleText";

var func = new ManaWallibFunc();

func.hideContent();

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
        CheckPlatformByOnline();
    }
    else {
        SetRunOnDevice(false, "SetManaRunonDevice This is *Mana*");
    }
}

async function CheckPlatformByOnline() {
    var statusCode = await func.CheckPlatformByOnline();

    if (statusCode.browserCode == null && statusCode.manaCode == null) {
        return;
    } else if (statusCode.browserCode == "403" && statusCode.manaCode == null) {
        SetRunOnDevice(true, "CheckCallOnline 403 This is *FromWeb*");
    }
    else if (statusCode.browserCode == "0" && statusCode.manaCode == null) {
        SetRunOnDevice(false, "TheSHybridFunc true This is *Mana*");
    }
    else if (statusCode.browserCode == "0" && statusCode.manaCode == "200") {
        SetRunOnDevice(false, "CheckCallOnlineNLocal This is *Mana*");
    }
    else if (statusCode.browserCode == "0" && statusCode.manaCode == "0") {
        setTimeout(() => {
            if ((<any>window).TheSHybridFunc) {
                SetRunOnDevice(false, "CheckCallOnlineNLocal with Retry This is *Mana*");
            } else {
                SetRunOnDevice(true, "CheckCallOnlineNLocal This is *No internet*");
            }
        }, 50);
    }
}

function SetRunOnDevice(fromWeb: boolean, SetDeviceMsg: string = "") {
    func.SetRunOnDevice(fromWeb);
    // The$("#SrunOn").text(SetDeviceMsg);
}

export function GetLib() {
    return func.GetLib();
}

The$(document).ready(function () {
    // The$(".titleName").text(titleName);
    setTimeout(() => {
        TheSAppHybridFuncsReady(true);
    }, 50);
});