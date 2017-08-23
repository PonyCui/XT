import { View } from './main.pixi'

class MyView extends View {

    willMoveToSuperview() {
        this.alpha = 1.0
    }

}

const v = new MyView();
v.alpha = 1.0