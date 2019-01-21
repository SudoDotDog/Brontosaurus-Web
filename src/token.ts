/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 */

import { Basics, IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { ParsedToken } from "./declare";
import { getToken, parseToken } from "./util";

export class Token {

    public static getToken(
        onInvalid: () => void,
        applicationKey: string,
        getTokenFunc: () => string | null = getToken,
        visit: boolean = false,
    ): Token | null {

        const token: string | null = getTokenFunc();

        if (token) {

            const clazz: Token = new Token(token, onInvalid);
            if (clazz.applicationKey === applicationKey) {
                return clazz;
            }
            return null;
        } else {

            if (visit) {
                return null;
            }
            onInvalid();
            throw new Error('[Brontosaurus-Web] Invalid Token');
        }
    }

    private readonly _raw: string;

    private readonly _header: IBrontosaurusHeader;
    private readonly _body: IBrontosaurusBody;
    private readonly _signature: string;

    private readonly _onInvalid: () => void;

    private constructor(
        raw: string,
        onInvalid: () => void,
    ) {
        this._onInvalid = onInvalid;

        this._raw = raw;
        const parsed: ParsedToken = parseToken(this._raw);

        this._header = parsed.header;
        this._body = parsed.body;
        this._signature = parsed.signature;
    }

    public get raw(): string {

        this._validate();
        return this._raw;
    }

    public get applicationKey(): string {

        this._validate();
        return this._header.key;
    }

    public get groups(): string[] {

        this._validate();
        return this._body.groups;
    }

    public get infos(): Record<string, Basics> {

        this._validate();
        return this._body.infos;
    }

    public get username(): string {

        this._validate();
        const username: string = this._body.username;
        if (!username) {
            this._break();
        }

        return username;
    }

    public get signature(): string {

        this._validate();
        return this._signature;
    }

    private _validate(): true {

        if (Date.now() > this._header.expireAt) {
            this._break();
        }

        return true;
    }

    private _break(): void {

        this._onInvalid();
        throw new Error('[Brontosaurus-Web] Invalid Token');
    }
}
