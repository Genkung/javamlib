import { ManaFactory } from "./ManaFactory";

declare var The$: any;

export class ManaWallibFunc {
    private titleBarId = "#appTitleBar";
    private fac = new ManaFactory();
    private runningOnMana?: boolean;

    constructor() {}

    private ReloadPage() {
        console.log("Mana lib : ReloadPage");
        window.location.reload();
    };

    public GetLib() {
        return this.fac.GetManaLib();
    }

    public SetDeviceCheckpoint(fromWeb: boolean) {
        console.log("Mana lib : SetDeviceCheckpoint fromweb is  " + fromWeb);
        if (this.runningOnMana == true) return;
        if (this.runningOnMana == false && fromWeb == false) {
            this.ReloadPage();
            return;
        };
        this.runningOnMana = !fromWeb;
        this.fac.SetDeviceIsBrowser(fromWeb);
        if (fromWeb) {
            this.showContent();
        }
    }

    public hideContent() {
        console.log("hide content");

        var hideContentStyle = document.querySelector("style#app-hide-content");

        if (!hideContentStyle) {
            var style = document.createElement("style");
            style.setAttribute("id", "app-hide-content");
            style.type = "text/css";
            var css = "#app-form-submit {display: none;} ion-header:not(.home-header) {display: none;} nav {display:none !important;} " + this.titleBarId + " {display:none;}";
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        }
    }

    public showContent() {
        console.log("show content");

        var hideContentStyle = document.querySelector("style#app-hide-content");

        if (hideContentStyle) {
            document.head.removeChild(hideContentStyle);
            var titleMargin = The$("ion-header").outerHeight(true);

            //Ionic add margin to content
            The$("ion-content .fixed-content").css("margin-top", titleMargin);
            The$("ion-content .scroll-content").css("margin-top", titleMargin);
        }
    }
}

