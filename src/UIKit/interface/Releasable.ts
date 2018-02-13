export interface Releasable {

    retain(owner?: any): this;
    release(): this;

}