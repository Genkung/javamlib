var scriptForMana = document.createElement("script");
scriptForMana.src = "manajs://manamobile.js";
document.head.appendChild(scriptForMana);

var scriptForBrowser = document.createElement("script");
scriptForBrowser.src = "https://manadevfrom.blob.core.windows.net/zips/manaonline.js";
document.head.appendChild(scriptForBrowser);

(<any>window).TheSAppHybridFuncsReady = TheSAppHybridFuncsReady;

function TheSAppHybridFuncsReady(fromWeb = false) {
    console.log("Mana lib : TheSAppHybridFuncsReady fromweb is " + fromWeb);
    if ((<any>window).TheSHybridFunc) { func.SetDeviceCheckpoint(false); return; };
    if (fromWeb) {
        setTimeout(() => {
            if (!(<any>window).TheSHybridFunc) {
                if ((<any>window).TheSHybridFunc) { func.SetDeviceCheckpoint(false); return; };
                func.SetDeviceCheckpoint(fromWeb);
            }
        }, 80);
    }
    else func.SetDeviceCheckpoint(fromWeb);
}

import { MonetaryValue } from "./ITheSManaLibProvider";
import { ManaWallibFunc } from "./ManaWallibFunc";

declare var The$: any;

(<any>window).The$ = The$;

var func = new ManaWallibFunc();

func.hideContent();

export function GetLib() {
    return func.GetLib();
}

export function GetAmount(monetary: MonetaryValue)
{
    return func.GetAmount(monetary);
}

export function GetCurrency(monetary: MonetaryValue)
{
    return func.GetCurrency(monetary);
}

export function GetDisplay(monetary: MonetaryValue)
{
    return func.GetDisplay(monetary);
}

var element: any;

async function CustomKeyboardInputClicked() {
    console.log("CustomKeyboardInputClicked");
    element = The$(this);

    var lib = await func.GetLib();
    lib.showCustomKeyboard();
}

(<any>window).GetCurrentElementIsLast = () => GetCurrentElementIsLast();
function GetCurrentElementIsLast(): boolean {
    var allCustomkeyboard = The$("[customInput]");
    var allInput = The$("input");

    var isLastCustomkeyboard = The$(element).is(allCustomkeyboard.last());
    var isLastIonInput = The$(element.children("input")).is(allInput.last());
    var isLastInput = The$(element).is(allInput.last());

    return isLastCustomkeyboard && (isLastIonInput || isLastInput);
}

(<any>window).UnFocusCurrentInput = () => UnFocusCurrentInput();
function UnFocusCurrentInput() {
    var inputInIonInput = element.children("input");
    if (inputInIonInput.length) {
        inputInIonInput.blur();
    }
    else element.blur();
}

(<any>window).SetUpKeyboard = () => SetUpKeyboard();
function SetUpKeyboard() {
    console.log("SetUpKeyboard");
    The$("*[customInput]").attr("readonly", true);
    The$("*[customInput]").click(CustomKeyboardInputClicked);
    The$("ion-input[customInput]").on("ionFocus", CustomKeyboardInputClicked);
}

(<any>window).SetText = (text: string) => SetText(text);
function SetText(text: string) {
    element.val(text);
}

(<any>window).GetCurrentInputText = () => GetCurrentInputText();
function GetCurrentInputText() {
    return element.val();
}

(<any>window).GetCurrnentInputLabel = () => GetCurrnentInputLabel();
function GetCurrnentInputLabel() {
    var labelForInput = The$("label[for='" + element.attr("id") + "']").text();
    if (labelForInput == "") {
        labelForInput = The$("ion-label[for='" + element.attr("id") + "']").text()
    }
    return labelForInput;
}

const titleTextId = "#appTitleText";

export function GetCustomTitle() {
    var title = The$(titleTextId).text();
    return title;
}

export function GetBootstrapTitle(): string {
    var title = The$("nav .navbar-brand").text();
    return title;
}
