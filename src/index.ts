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

    public info<T>(): T {

        const token: Token | null = Token.getToken(this._onInvalid.bind(this), this._key);

        if (token) {

            console.log(token);
        } else {

            window.location.href = this._targetPath();
        }

        return null as any;
    }

    private _targetPath(): string {

        return `${this._server}?key=${this._key}&cb=${this._callbackPath}`;
    }

    private _onInvalid(): void {

        window.location.href = this._targetPath();
    }
}
