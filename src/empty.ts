/**
 * @author WMXPY
 * @namespace Brontosaurus_Web
 * @description Token
 */

import { Basics } from "@brontosaurus/definition";

export class EmptyToken {

    public get empty(): boolean {
        return true;
    }
    public get raw(): string {
        return "";
    }
    public get groups(): string[] {
        return [];
    }
    public get mint(): string {
        return "";
    }
    public get infos(): Record<string, Basics> {
        return {};
    }
    public get beacons(): Record<string, Basics> {
        return {};
    }
    public get username(): string {
        return "";
    }
    public get displayName(): string | undefined {
        return undefined;
    }
    public get name(): string {
        return "";
    }
    public get email(): string | undefined {
        return undefined;
    }
    public get signature(): string {
        return "";
    }
    public get organization(): string | undefined {
        return undefined;
    }
    public get tags(): string[] {
        return [];
    }
    public get organizationTags(): string[] | undefined {
        return [];
    }
    public get combineTags(): string[] {
        return [];
    }

    public sameApplication(applicationKey: string): boolean {
        return false;
    }

    public hasOneOfGroup(...groups: string[]): boolean {
        return false;
    }

    public hasGroups(...groups: string[]): boolean {
        return false;
    }

    public hasNoGroups(...groups: string[]): boolean {
        return false;
    }

    public accountHasOneOfTag(...tags: string[]): boolean {
        return false;
    }

    public accountHasTags(...tags: string[]): boolean {
        return false;
    }

    public organizationHasOneOfTag(...tags: string[]): boolean {
        return false;
    }

    public organizationHasTags(...tags: string[]): boolean {
        return false;
    }

    public combineHasOneOfTag(...tags: string[]): boolean {
        return false;
    }

    public combineHasTags(...tags: string[]): boolean {
        return false;
    }

    public validate(): boolean {
        return false;
    }
}
