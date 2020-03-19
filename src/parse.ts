/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Parse
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";

export type ParseCombinedResult = {

    readonly method: 'regular' | 'url-friendly' | 'default';
    readonly username: string;
    readonly namespace: string;
};

export const parseUsernameNamespaceCombined = (combined: string): ParseCombinedResult => {

    const regularSplited: string[] = combined.split('/');
    if (regularSplited.length === 2) {

        return {
            method: 'regular',
            username: regularSplited[1],
            namespace: regularSplited[0],
        };
    }

    const urlFriendlySplited: string[] = combined.split('_');
    if (urlFriendlySplited.length === 2) {

        return {
            method: 'url-friendly',
            username: urlFriendlySplited[1],
            namespace: urlFriendlySplited[0],
        };
    }

    return {
        method: 'default',
        username: combined,
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
    };
};
