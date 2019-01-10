/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Util
 */

import { LOCAL_STORAGE_KEY } from "./declare";

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_KEY);
