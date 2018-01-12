package com.opensource.xtruntime

/**
 * Created by cuiminghui on 2017/9/1.
 */

class XTRViewAnimationProperty<T>(val aniKey: String, val fromValue: T, val toValue: T, val onValue: (value: T) -> Unit)