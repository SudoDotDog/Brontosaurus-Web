/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Declare
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";

export const LOCAL_STORAGE_KEY = 'BRONTOSAURUS-TOKEN';

export type ParsedToken = {

    header: IBrontosaurusHeader;
    body: IBrontosaurusBody;
    signature: string;
};
