package com.opensource.xt.uikit

/**
 * Created by cuiminghui on 2017/9/1.
 */

class XTUIViewAnimationProperty<T>(val aniKey: String, val fromValue: T, val toValue: T, val onValue: (value: T) -> Unit)