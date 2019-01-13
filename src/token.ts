/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { ParsedToken } from "./declare";
import { getToken, parseToken } from "./util";

export class Token {

    public static getToken(): Token | null {

        const token: string = getToken();

        if (token) {

            return new Token(token);
        }

        return null;
    }

    private readonly _raw: string;
    private readonly _header: IBrontosaurusHeader;
    private readonly _body: IBrontosaurusBody;
    private readonly _signature: string;

    private constructor(raw: string) {

        this._raw = raw;

        const parsed: ParsedToken = parseToken(raw);

        this._header = parsed.header;
        this._body = parsed.body;
        this._signature = parsed.signature;
    }
}
