/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Util
 */

import { LOCAL_STORAGE_KEY, ParsedToken } from "./declare";

export const getToken = (): string | null => localStorage.getItem(LOCAL_STORAGE_KEY);
export const storeToken = (token: string): void => localStorage.setItem(LOCAL_STORAGE_KEY, token);
export const removeToken = (): void => localStorage.removeItem(LOCAL_STORAGE_KEY);

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

export const getParamByUrl = (url: string, name: string): string | null => {

    const wrap: URL = new URL(url);
    const param: string | null = wrap.searchParams.get(name);

    if (param) {
        return decodeURIComponent(param);
    }
    return null;
};

export const getParam = (url: string, name: string): string | null => {

    const encodedName: string =
        ['(', ')', '{', '}', '.', '+', '?', '!', '*', '$', '|'].reduce(
            (previous: string, current: string) =>
                previous.replace(new RegExp(`\\${current}`, 'g'), '\\' + current),
            name);

    const regexp: RegExp = new RegExp(`(${encodedName}=)(.*?)(&|$)`, 'i');
    const matched: string[] | null = url.match(regexp);

    if (!matched || !matched[0]) {
        return null;
    }

    const center: string = matched[0] as string; // 'name=value&' | 'name=value'
    const equalIndex: number = center.indexOf('=');

    if (equalIndex === -1) {
        return null;
    }

    const andIndex: number = center.indexOf('&');

    if (andIndex === -1) {
        return decodeURIComponent(center.substring(equalIndex + 1, center.length));
    }

    return decodeURIComponent(center.substring(equalIndex + 1, center.length - 1));
};
