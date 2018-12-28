/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Index
 */

export class BrontosaurusWeb {

    public static register(server: string): void {

        if (!this._instance) {
            this._instance = new BrontosaurusWeb(server);
        }
    }

    public static token(): void {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }
    }

    public static group(): void {

        if (!this._instance) {
            throw new Error('[Brontosaurus-Web] Need Register');
        }
    }

    private static _instance: BrontosaurusWeb | undefined;

    private readonly _server: string;

    private constructor(server: string) {

        this._server = server;
    }

    private token() {


    }
}
