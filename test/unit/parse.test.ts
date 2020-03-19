/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Parse
 * @package Unit Test
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from '@brontosaurus/definition';
import { expect } from 'chai';
import * as Chance from 'chance';
import { ParseCombinedResult, parseUsernameNamespaceCombined } from '../../src';

describe('Given [Parse] helper function', (): void => {

    const chance: Chance.Chance = new Chance("brontosaurus-web-parse");

    describe('[parseUsernameNamespaceCombined] function', (): void => {

        it('should be able to split regular combined', (): void => {

            const username: string = chance.word();
            const namespace: string = chance.word();

            const combined: string = `${namespace}/${username}`;

            const result: ParseCombinedResult = parseUsernameNamespaceCombined(combined);

            expect(result).to.be.deep.equal({
                method: 'regular',
                username,
                namespace,
            });
        });

        it('should be able to split url friendly combined', (): void => {

            const username: string = chance.word();
            const namespace: string = chance.word();

            const combined: string = `${namespace}_${username}`;

            const result: ParseCombinedResult = parseUsernameNamespaceCombined(combined);

            expect(result).to.be.deep.equal({
                method: 'url-friendly',
                username,
                namespace,
            });
        });

        it('should be able to split default combined', (): void => {

            const username: string = chance.word();

            const combined: string = `${username}`;

            const result: ParseCombinedResult = parseUsernameNamespaceCombined(combined);

            expect(result).to.be.deep.equal({
                method: 'default',
                username,
                namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
            });
        });
    });
});
