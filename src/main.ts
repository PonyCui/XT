import { Factory, SwitchFactory } from './implementation/Factory'

SwitchFactory()

export const XT = Factory;

if (window !== undefined) {
    (window as any).XT = Factory;
}