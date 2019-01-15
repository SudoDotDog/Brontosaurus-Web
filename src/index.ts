/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Index
 */

import { Token } from "./token";

export class Brontosaurus {

    public static register(server: string, key: string, visit: boolean = false): Brontosaurus {

        if (!this._instance) {
            this._instance = new Brontosaurus(server, key);
        }

        if (!visit) {
            this._instance.info();
        }

        return this._instance;
    }

    public static token(): void {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }
    }

    public static group(): void {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }
    }

    private static _instance: Brontosaurus | undefined;

    private readonly _server: string;
    private readonly _key: string;

    private _callbackPath: string;

    private constructor(server: string, key: string) {

        this._server = server;
        this._key = key;

        this._callbackPath = window.location.href;
    }

    public setCallbackPath(callbackPath: string): Brontosaurus {

        this._callbackPath = callbackPath;
        return this;
    }

    public info(): Token {

        const token: Token | null = Token.getToken(this._onInvalid.bind(this), this._key);

        if (!token) {
            this._onInvalid();
        }
        return token as Token;
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
