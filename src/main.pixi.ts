import { Factory, SwitchFactory } from './implementation/Factory.pixi'
SwitchFactory()
export default Factory;
if (window !== undefined) {
    (window as any).XT = Factory;
}