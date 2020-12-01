import { ITheSManaLibProvider } from "./ITheSManaLibProvider"
import axios from 'axios';

axios.interceptors.response.use(response => {
    return response?.data;
});

export class ManaRestService implements ITheSManaLibProvider {

    private callBackFunc: () => void;
    private onStateChangedFunc: (param: any) => void;
    private onSelectToolbar: (action: any) => void;
    private onOptionSelected: (response: any) => any;

    private apiBase: string = "https://api-mana-from.azurewebsites.net";
    private apiUrls: Map<string, string> = new Map<string, string>();

    constructor() {
        (<any>window).refreshOnGoBack = () => { this.executeCallBackFunc() };

        (<any>window).OnStateChanged = (param: any) => { this.executeOnStateChanged(param) };

        (<any>window).OnSelectToolbar = (action: any) => { this.excuteToolbarItemFunc(action) };

        (<any>window).onOptionSelected = (response: any) => { return this.excuteOnOptionSelected(response) };
    }

    showCustomKeyboard(): Promise<any> {
        return new Promise<any>(() => { });
    }

    initPageApi(mcontentid: string): Promise<any> {
        return new Promise<any>((resolver, rejector) => {
            if (this.apiUrls.has(mcontentid)) {
                resolver(this.apiUrls.get(mcontentid));
            } else {
                console.log('Get mcid: ' + mcontentid);
                axios.get<InitPageAPI>(this.apiBase + "/api/mcontent/form/" + mcontentid).then((data: any) => {
                    this.apiUrls.set(mcontentid, data.url);
                    resolver(data.url);
                }).catch(err => rejector(err));
            }
        });
    }

    initPageApiWithCallBack(mcontentid: string, fn: () => void): Promise<any> {
        this.callBackFunc = fn;

        return new Promise<any>((resolver, rejector) => {
            if (this.apiUrls.has(mcontentid)) {
                resolver(this.apiUrls.get(mcontentid));
            } else {
                console.log('Get mcid: ' + mcontentid);
                axios.get<InitPageAPI>(this.apiBase + "/api/mcontent/form/" + mcontentid).then((data: any) => {
                    this.apiUrls.set(mcontentid, data.url);
                    resolver(data.url);
                }).catch(err => rejector(err));
            }
        });
    }

    getApiData(mcid: string): Promise<any> {
        return this.initPageApi(mcid).then(url => {
            console.log('[getApiData]: ' + url);
            return axios.get(url);
        });
    }

    getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any> {
        return this.initPageApi(mcid).then((url: any) => {
            console.log('[getApiData]: ' + url);
            return axios.get(url + "/" + endpointId);
        });
    }

    submitFormData(mcid: string, data: any, manualClose: boolean) {
        console.log("post data : " + JSON.stringify(data));
        var prom = this.initPageApi(mcid).then(url => axios.post(url, data));
        if (!manualClose) {
            //How to use navCtrl
            //this.navCtrl.popToRoot();
        }
        return prom;
    }
    submitFormDataWithEndpointId(mcid: string, data: any, endpointId: string, manualClose: boolean) {
        var prom = this.initPageApi(mcid).then(url => axios.post(url + "/" + endpointId, data));
        if (!manualClose) {
            //How to use navCtrl
            //this.navCtrl.popToRoot();;
        }
        return prom;
    }
    callApiGet(mcid: string, url: string): Promise<any> {
        return axios.get(url);
    }
    callApiPost(mcid: string, data: any): Promise<any> {
        var prom = this.initPageApi(mcid).then(url => axios.post(url, data));
        return prom;
    }
    callApiDelete(mcid: string): Promise<any> {
        return this.initPageApi(mcid).then(url => axios.delete(url));
    }
    visitEndpoint(mcid: string, url: string): void {
        switch (url) {
            //How to use navCtrl
            // case "user-profile-edit-name": this.navCtrl.push("UserProfileEditNamePage", url); break;
            // case "user-profile-edit-address": this.navCtrl.push("UserProfileEditAddressPage", url); break;
            default: window.location.assign(url); break;
        }
    }
    callTrigger(mcid: string, triggerName: string): void {
        switch (triggerName) {
            default: window.location.assign(triggerName); break;
        }
    }
    validForm(valid: boolean) {
        console.log("form validation status :" + valid)
    }
    confirmForm(meesage: import("./ITheSManaLibProvider").confirmMessage): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppBridge() {
        return new Promise<any>(() => { });
    }
    selectImage(mcid: string): Promise<any> {
        return new Promise<any>(() => { });
    }
    setButtonVisibility(isVisible: boolean) {
        console.log("setButtonVisibility:" + isVisible)
    }
    setStateChangedHandler(fn: (param: any) => void) {
        this.onStateChangedFunc = fn;
        console.log("setStateChangedHandler");
    }
    addToolbarAction(fn: (action: any) => void) {
        this.onSelectToolbar = fn;
    }
    showOptionDialog(mcid: any, params: any): Promise<any> {
        return new Promise<any>(() => { });
    }
    initOptionDialog(mcid: string, fn: (param: any) => any): Promise<any> {
        this.onOptionSelected = fn;
        return new Promise<any>(() => { });
    }
    setGpsSection(address: string, latitude: string, longitude: string, phoneNumber: string, remark: string) {
        console.log("setGpsSection")
    }
    getGpsLocation(mcid: string): Promise<any> {
        console.log("getGpsLocation")
        return new Promise<any>(() => { });
    }

    private executeCallBackFunc() {
        if (this.callBackFunc) {
            this.callBackFunc();
        }
    }

    private executeOnStateChanged(param: any) {
        if (this.onStateChangedFunc) {
            this.onStateChangedFunc(param);
        }
    }

    private excuteToolbarItemFunc(action: any) {
        if (this.onSelectToolbar) {
            this.onSelectToolbar(action);
        }
    }

    private excuteOnOptionSelected(response: any): any {
        if (this.onOptionSelected) {
            return this.onOptionSelected(response);
        }
    }
}

interface InitPageAPI {
    url: string;
}