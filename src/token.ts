/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { ParsedToken } from "./declare";
import { getInfo, getToken, parseToken } from "./util";

export class Token {

    public static getToken(
        onInvalid: () => void,
        applicationKey: string,
    ): Token | null {

        const token: string | null = getToken();

        if (token) {

            const clazz: Token = new Token(token, onInvalid);
            if (clazz.applicationKey === applicationKey) {
                return clazz;
            }
        }

        return null;
    }

    private readonly _header: IBrontosaurusHeader;
    private readonly _body: IBrontosaurusBody;
    private readonly _signature: string;

    private readonly _onInvalid: () => void;

    private constructor(
        raw: string,
        onInvalid: () => void,
    ) {

        const parsed: ParsedToken = parseToken(raw);

        this._header = parsed.header;
        this._body = parsed.body;
        this._signature = parsed.signature;

        this._onInvalid = onInvalid;
    }

    public get applicationKey(): string {

        return this._header.key;
    }

    public getInfo(key: string): string | null {

        this._validate();
        const infos: string[] = this._body.infos || [];

        return getInfo(infos, key);
    }

    public getUsername(): string {

        this._validate();
        const username: string = this._body.username;
        if (!username) {
            this._onInvalid();
        }

        return username;
    }

    private _validate(): true {

        if (Date.now() > this._header.expireAt) {
            this._onInvalid();
        }

        return true;
    }
}
