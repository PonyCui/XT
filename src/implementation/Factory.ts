import * as Interfaces from '../interface/Interfaces'
import { usePixi } from './pixi/index'

export let Factory: any = Interfaces

export function SwitchFactory() {
    usePixi();
}