import { usePixi } from './pixi/index'
import { Factory as BaseFactory } from './Factory'
import * as I from '../interface/Abstract'

export class Factory extends BaseFactory {

}

export function SwitchFactory() {
    usePixi();
}