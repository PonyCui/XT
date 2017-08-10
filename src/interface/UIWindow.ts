import { UIView } from './UIView'

export interface UIWindow extends UIView {
    makeKeyAndVisible(): void;
}