/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Util
 */

import { LOCAL_STORAGE_KEY, ParsedToken } from "./declare";

export const getToken = (): string | null => localStorage.getItem(LOCAL_STORAGE_KEY);

const decodeSlice = (encoded: string): any => JSON.parse(atob(encoded));

export const parseToken = (token: string): ParsedToken => {

    const splited: string[] = token.split('.');

    if (splited.length !== 3) {
        throw new Error('Wrong');
    }

    const [header, body, signature] = splited;

    return {
        header: decodeSlice(header),
        body: decodeSlice(body),
        signature,
    };
};

export const getInfo = (infos: string[], key: string): string | null => {

    for (const info of infos) {

        const splited: string[] = info.split(':');
        if (splited.length !== 2) {
            return null;
        }
        if (key === splited[0]) {
            return splited[1];
        }
    }

    return null;
};
