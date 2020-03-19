/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Parse
 */

export type ParseCombinedResult = {

    readonly method: 'regular' | 'url-friendly';
    readonly username: string;
    readonly namespace: string;
};

export const parseUsernameNamespaceCombined = (combined: string): ParseCombinedResult | null => {

    const regularSplited: string[] = combined.split('/');
    if (regularSplited.length === 2) {

        return {
            method: 'regular',
            username: regularSplited[1],
            namespace: regularSplited[0],
        };
    }
};
