export interface Releasable {

    retain?(): this;
    release?(): this;

    addOwner(owner: any): this;
}