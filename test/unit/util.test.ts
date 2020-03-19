/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { getParam } from '../../src/util';

describe('Given [Util] helper function', (): void => {

    const chance: Chance.Chance = new Chance("brontosaurus-web-util");

    describe('[getParam] function', (): void => {

        const getUrl = (name: string, value: string): string => {

            const params: string[] = [
                `${encodeURIComponent(chance.string())}=${encodeURIComponent(chance.string())}`,
                `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
                `${encodeURIComponent(chance.string())}=${encodeURIComponent(chance.string())}`,
            ];
            return `https://${encodeURIComponent(chance.string())}.com?${params.join('&')}`;
        };

        it('should be able to get parameter', (): void => {

            const key: string = chance.string();
            const value: string = chance.string();
            const url: string = getUrl(key, value);

            const result: string | null = getParam(url, key);

            expect(result).to.be.equal(value);
        });

        it('should be able to return null', (): void => {

            const url: string = getUrl(chance.string(), chance.string());

            const result: string | null = getParam(url, chance.string());

            // tslint:disable-next-line
            expect(result).to.be.null;
        });
    });
});
