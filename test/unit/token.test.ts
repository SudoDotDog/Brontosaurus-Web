/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 * @package Unit Test
 */

import { IBrontosaurusHeader } from '@brontosaurus/definition';
import { Sandbox } from '@sudoo/mock';
import { expect } from 'chai';
import * as Chance from 'chance';
import { Token } from '../../src/token';

declare const global: any;

describe('Given a {Token} class', (): void => {

    const chance: Chance.Chance = new Chance("brontosaurus-web-token");

    let originalAtob: any;
    before(() => {
        originalAtob = global.atob;
    });

    after(() => {
        global.atob = originalAtob;
    });

    it('should be able to create', (): void => {

        const token: string = chance.string() + '.' + chance.string() + '.' + chance.string();
        const key: string = chance.string();

        const header: Partial<IBrontosaurusHeader> = {
            key,
        };
        global.atob = Sandbox.stub(JSON.stringify(header));

        const onInvalid: Sandbox = Sandbox.create();
        const getTokenFunc = () => token;

        const clazz: Token | null = Token.getToken(onInvalid.func(), key, getTokenFunc);

        expect(clazz).to.be.instanceOf(Token);
    });
});
