/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Index
 */

import { Token } from "./token";
import { getParam, removeToken, storeToken } from "./util";

export class Brontosaurus {

    public static register(server: string, key: string, callbackPath?: string, visit: boolean = false): Brontosaurus {

        if (this._instance) {
            throw new Error('[Brontosaurus-Web] Registered');
        }

        this._instance = new Brontosaurus(server, key, callbackPath)._put();

        if (!visit) {
            this._instance._token();
        }

        return this._instance;
    }

    public static logout(relogin?: boolean): Brontosaurus {

        return this.instance.logout(relogin);
    }

    public static token(): Token {

        return this.instance.info();
    }

    public static rummage(): Token | null {

        return this.instance.rummage();
    }

    public static get raw(): string {

        return this.instance.info().raw;
    }

    public static get group(): string[] {

        return this.instance.info().groups;
    }

    public static get instance(): Brontosaurus {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }

        return this._instance;
    }

    private static _instance: Brontosaurus | undefined;

    private readonly _server: string;
    private readonly _key: string;

    private readonly _callbackPath: string;

    private constructor(server: string, key: string, callbackPath?: string) {

        this._server = server;
        this._key = key;

        this._callbackPath = callbackPath || window.location.href;
    }

    public info(): Token {

        const token: Token | null = this._token();

        if (!token) {
            this._onInvalid();
        }
        return token as Token;
    }

    public rummage(): Token | null {

        const token: Token | null = this._token();
        return token;
    }

    public logout(relogin?: boolean): Brontosaurus {

        removeToken();
        if (relogin) {
            this.info();
        }
        return this;
    }

    private _put(): Brontosaurus {

        const token: string | null = getParam(window.location.href, 'token');
        if (token) {
            storeToken(token);
            window.history.replaceState({}, document.title, this._callbackPath);
        }

        return this;
    }

    private _token(): Token | null {

        return Token.getToken(this._onInvalid.bind(this), this._key);
    }

    private _targetPath(): string {

        const keyParam: string = `key=${encodeURIComponent(this._key)}`;
        const cbParam: string = `cb=${encodeURIComponent(this._callbackPath)}`;
        return `${this._server}?${keyParam}&${cbParam}`;
    }

    private _onInvalid(): void {

        window.location.href = this._targetPath();
    }
}

export { Token };

