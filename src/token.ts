/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { ParsedToken } from "./declare";
import { getToken, parseToken } from "./util";

export class Token {

    public static getToken(): Token {

        return new Token(getToken());
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
