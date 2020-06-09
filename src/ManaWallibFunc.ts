import { ManaFactory } from "./ManaFactory";
import axios, { AxiosInstance } from "axios";

declare var The$: any;

export class ManaWallibFunc {
    private titleBarId = "#appTitleBar";
    private browserUrl = "https://safebrowsing.googleapis.com/v4/threatLists";
    private manaUrl = "https://jsonplaceholder.typicode.com/todos/1";
    private fac = new ManaFactory();
    private axiosInstance: AxiosInstance;
    private runningOnMana?: boolean;

    constructor(axiosInstance: AxiosInstance = axios) {
        this.axiosInstance = axiosInstance;
    }

    private ReloadPage() {
        console.log("Mana lib : ReloadPage");
        window.location.reload();
    };

    public GetLib() {
        return this.fac.GetManaLib();
    }

    public SetRunOnDevice(fromWeb: boolean) {
        console.log("Mana lib : SetRunOnDevice " + fromWeb);
        if (this.runningOnMana == true) return;
        if (this.runningOnMana == false && fromWeb == false) {
            this.ReloadPage();
            return;
        };
        this.runningOnMana = !fromWeb;
        this.fac.SetRunOnDevice(fromWeb);
        if(fromWeb)
        {
            this.showContent();
        }
    }

    public CheckPlatformByOnline(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.runningOnMana) resolve({ browserCode: null, manaCode: null });

            this.axiosInstance.get(this.browserUrl).catch(err => {
                if (err.response && err.response.status == "403") {
                    resolve({ browserCode: "403", manaCode: null });;
                } else {
                    if ((<any>window).TheSHybridFunc) {
                        resolve({ browserCode: "0", manaCode: null });
                    } else {

                        if (this.runningOnMana) resolve({ browserCode: null, manaCode: null });

                        this.axiosInstance.get(this.manaUrl).then(res => {
                            resolve({ browserCode: "0", manaCode: "200" });
                        }).catch(err => {
                            resolve({ browserCode: "0", manaCode: "0" });
                        });
                    }
                }
            });
        });
    }

    public hideContent() {
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

