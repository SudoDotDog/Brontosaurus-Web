/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Util
 */

import { LOCAL_STORAGE_KEY, ParsedToken } from "./declare";

export const getToken = (): string | null => localStorage.getItem(LOCAL_STORAGE_KEY);
export const storeToken = (token: string): void => localStorage.setItem(LOCAL_STORAGE_KEY, token);

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

export const getParam = (url: string, name: string): string | null => {

    const regexp: RegExp = new RegExp(`(${name}=)(.*?)(&)`, 'i');
    const matched: string[] | null = url.match(regexp);

    if (!matched || !matched[0]) {
        return null;
    }

    const center: string = matched[0] as string; // 'name=value&'
    const equalIndex: number = center.indexOf('=');

    if (equalIndex === -1) {
        return null;
    }

    return center.substring(equalIndex, center.length - 1);
};
