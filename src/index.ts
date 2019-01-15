/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Index
 */

import { Token } from "./token";
import { getParam, storeToken } from "./util";

export class Brontosaurus {

    public static register(server: string, key: string, visit: boolean = false): Brontosaurus {

        this._putToken();

        if (!this._instance) {
            this._instance = new Brontosaurus(server, key);
        }

        if (!visit) {
            this._instance._token();
        }

        return this._instance;
    }

    public static get token(): Token {

        return this.instance.info();
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

    private static _putToken(): boolean {

        const token: string | null = getParam(window.location.href, 'token');
        if (token) {
            storeToken(token);
            return true;
        }

        return false;
    }

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
