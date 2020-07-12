/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Brontosaurus
 */

import { EmptyToken } from "./empty";
import { Token } from "./token";
import { getParam, removeToken, storeToken } from "./util";

export type BrontosaurusConfig = {

    readonly externalLink?: boolean;
};

export type BrontosaurusHydrateConfig = {

    readonly allowVisit?: boolean,
    readonly callbackPath?: string,
    readonly beforeRedirect?: () => void | Promise<void>,
};

export class Brontosaurus {

    private static _fallback: boolean = false;
    private static _instance: Brontosaurus | undefined;

    public static hydrate(
        server: string,
        key: string,
        config?: BrontosaurusHydrateConfig,
    ): Brontosaurus {

        const instance: Brontosaurus = this.register(server, key);

        const fixedConfig: BrontosaurusHydrateConfig = {
            allowVisit: false,
            ...config,
        };

        instance.check();
        if (fixedConfig.allowVisit) {
            return instance;
        }

        instance.validate(fixedConfig.callbackPath, fixedConfig.beforeRedirect);
        return instance;
    }

    public static register(
        server: string,
        key: string,
        config?: BrontosaurusConfig,
    ): Brontosaurus {

        if (this._instance) {
            throw new Error('[Brontosaurus-Web] Registered');
        }

        const fixedConfig: BrontosaurusConfig = {
            ...config,
        };

        this._instance = new Brontosaurus(server, key, fixedConfig);
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

    public static enableFallback(): void {

        this._fallback = true;
        return;
    }

    public static get instance(): Brontosaurus {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }

        return this._instance;
    }

    private readonly _server: string;
    private readonly _key: string;

    private _externalLink: boolean;

    private _redirecting: boolean;

    private constructor(
        server: string,
        key: string,
        config: BrontosaurusConfig,
    ) {

        this._server = server;
        this._key = key;

        this._externalLink = Boolean(config.externalLink);

        this._redirecting = false;
    }

    public redirect(callbackPath: string = this._defaultCallbackPath(), beforeRedirect?: () => void | Promise<void>): this {

        if (this._redirecting) {
            return this;
        }
        this._redirecting = true;

        if (beforeRedirect) {
            Promise.resolve(beforeRedirect()).then(() => window.location.href = this._redirectPath(callbackPath));
        } else {
            window.location.href = this._redirectPath(callbackPath);
        }
        return this;
    }

    public check(): this {

        const token: string | null = getParam(window.location.href, 'token');
        if (token) {
            storeToken(token);
            window.history.replaceState({}, document.title, this._defaultJumpPath());
        }
        return this;
    }

    public validate(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): this {

        const token: Token | null = this._token();

        if (!token) {
            this.redirect(callbackPath, beforeRedirect);
            return this;
        }

        if (!token.validate()) {
            this.redirect(callbackPath, beforeRedirect);
            return this;
        }

        return this;
    }

    public hard(callbackPath?: string, beforeRedirect?: () => void | Promise<void>): Token {

        const token: Token | null = this._token(callbackPath);

        if (!token) {
            this.redirect(callbackPath, beforeRedirect);
            if (Brontosaurus._fallback) {
                return new EmptyToken() as any as Token;
            }
            return null as any;
        }
        return token;
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

    private _defaultJumpPath(): string {

        const url: URL = new URL(window.location.href);
        const entries: Array<[string, string]> = [...url.searchParams.entries()];
        const searchMap: Record<string, any> = entries.reduce((previous: Record<string, any>, current: [string, string]) => {

            const key: string = current[0];
            const value: string = current[1];

            if (key === 'token') {
                return previous;
            }

            return {
                ...previous,
                [key]: value,
            };
        }, {});

        const search: string = Object.keys(searchMap).reduce((previous: string, current: string, index: number) => {
            if (index === 0) {
                return `?${current}=${searchMap[current]}`;
            }
            return `${previous}&${current}=${searchMap[current]}`;
        }, '');

        return `${url.origin}${url.pathname}${search}`;
    }

    private _defaultCallbackPath(): string {

        const url: URL = new URL(window.location.href);
        return `${url.origin}${url.pathname}${url.search}`;
    }

    private _token(callbackPath?: string): Token | null {

        const onInvalid: () => void = this._getOnInvalid(callbackPath);
        return Token.getToken(onInvalid, this._key);
    }

    private _redirectPath(callbackPath: string): string {

        const keyParam: string = `key=${encodeURIComponent(this._key)}`;
        const cbParam: string = `cb=${encodeURIComponent(callbackPath)}`;
        const elParam: string = `el=${this._externalLink ? 'true' : 'false'}`;

        return `${this._server}?${keyParam}&${cbParam}&${elParam}`;
    }

    private _defaultRedirectCallbackPath(): string {

        const defaultCallbackPath: string = this._defaultCallbackPath();
        return this._redirectPath(defaultCallbackPath);
    }

    private _getOnInvalid(callbackPath: string = this._defaultRedirectCallbackPath()): () => void {

        return () => window.location.href = callbackPath;
    }
}
