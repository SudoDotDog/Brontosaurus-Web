/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Util
 */

import { LOCAL_STORAGE_KEY } from "./declare";

export const getToken = (): string | null => localStorage.getItem(LOCAL_STORAGE_KEY);

export const checkToken = (token: string) => {


};

export const parseBody = (token: string) => {

    const splited: string[] = token.split('.');

    if (splited.length !== 3) {

        throw new Error('Wrong');
    }

    const [header, body, signature] = splited;
};
