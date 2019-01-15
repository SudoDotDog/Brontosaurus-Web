/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Token } from '../../src/token';

describe('Given a {Token} class', (): void => {

    const chance: Chance.Chance = new Chance("brontosaurus-web-token");

    it('should be able to create', (): void => {

        const token: string = chance.string();
        const getTokenFunc = () => token;

        expect(1).to.be.equal(1);
    });
});
