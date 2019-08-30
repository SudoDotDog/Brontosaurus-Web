/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Brontosaurus
 */

import { Token } from "./token";
import { getParam, removeToken, storeToken } from "./util";

export class Brontosaurus {

    public static hydrate(server: string, key: string, allowVisit: boolean = false): Brontosaurus {

        const instance: Brontosaurus = this.register(server, key);

        instance.check();
        if (allowVisit) {
            return instance;
        }

        instance.validate();
        return instance;
    }

    public static register(server: string, key: string): Brontosaurus {

        if (this._instance) {
            throw new Error('[Brontosaurus-Web] Registered');
        }

        this._instance = new Brontosaurus(server, key);
        return this._instance;
    }

    public static logout(relogin?: boolean): Brontosaurus {

        return this.instance.logout(relogin);
    }

    public static raw(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): string {

        return this.hard(callbackPath, beforeRedirect).raw;
    }

    public static hard(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): Token {

        return this.instance.hard(callbackPath, beforeRedirect);
    }

    public static redirect(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): Brontosaurus {

        return this.instance.redirect(callbackPath, beforeRedirect);
    }

    public static soft(): Token | null {

        return this.instance.soft();
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

    private constructor(server: string, key: string) {

        this._server = server;
        this._key = key;
    }

    public redirect(callbackPath: string = window.location.href, beforeRedirect?: () => void | Promise<void>): this {

        if (beforeRedirect) {
            Promise.resolve(beforeRedirect()).then(() => window.location.href = this._redirectPath(callbackPath));
        } else {
            window.location.href = this._redirectPath(callbackPath);
        }
        return this;
    }

    public check(callbackPath: string = window.location.origin): this {

        const token: string | null = getParam(window.location.href, 'token');
        if (token) {
            storeToken(token);
            window.history.replaceState({}, document.title, callbackPath);
        }
        return this;
    }

    public validate(callbackPath?: string): this {

        const token: Token | null = this._token();

        if (!token) {
            this.redirect(callbackPath);
            return this;
        }

        if (!token.validate()) {
            this.redirect(callbackPath);
            return this;
        }

        return this;
    }

    public hard(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): Token {

        const token: Token | null = this._token();

        if (!token) {
            this.redirect(callbackPath, beforeRedirect);
            return null as any;
        }
        return token as Token;
    }

    public soft(): Token | null {

        const token: Token | null = this._token();
        return token;
    }

    public logout(redirect: boolean = true): Brontosaurus {

        removeToken();
        if (redirect) {
            this.redirect();
        }
        return this;
    }

    private _token(callbackPath?: string): Token | null {

        const onInvalid: (() => void) | null = callbackPath ? this._getOnInvalid(callbackPath) : null;
        return Token.getToken(onInvalid, this._key);
    }

    private _redirectPath(callbackPath: string): string {

        const keyParam: string = `key=${encodeURIComponent(this._key)}`;
        const cbParam: string = `cb=${encodeURIComponent(callbackPath)}`;
        return `${this._server}?${keyParam}&${cbParam}`;
    }

    private _getOnInvalid(callbackPath: string): () => void {

        return () => window.location.href = callbackPath;
    }
}
