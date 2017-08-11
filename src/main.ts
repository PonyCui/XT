import { Factory, SwitchFactory } from './implementation/Factory'
SwitchFactory()
export default Factory;
if (window !== undefined) {
    (window as any).XT = Factory;
}