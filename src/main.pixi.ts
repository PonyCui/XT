import { View as IView } from './interface/View'
import { View as MView } from './implementation/pixi/View'

export const View: typeof IView = MView