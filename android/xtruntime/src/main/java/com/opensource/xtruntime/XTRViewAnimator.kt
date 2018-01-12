package com.opensource.xtruntime

import android.animation.Animator
import android.animation.ValueAnimator
import com.facebook.rebound.SimpleSpringListener
import com.facebook.rebound.Spring
import com.facebook.rebound.SpringConfig
import com.facebook.rebound.SpringSystem

class XTRViewAnimator {

    companion object {

        var animationEnabled = false
        var animationProps: Map<String, XTRViewAnimationProperty<Any>> = mapOf()
        var animatingHandlers: Map<String, () -> Unit> = mapOf()

        fun addAnimation(aniProp: XTRViewAnimationProperty<Any>) {
            animatingHandlers[aniProp.aniKey]?.invoke()
            (aniProp.fromValue as? Float)?.let { fromValue ->
                (aniProp.toValue as? Float)?.let { toValue ->
                    if (Math.abs(fromValue - toValue) < 0.001) {
                        return
                    }
                }
            }
            if (aniProp.fromValue == aniProp.toValue) {
                return
            }
            val mutableMap = animationProps.toMutableMap()
            mutableMap[aniProp.aniKey] = aniProp
            animationProps = mutableMap.toMap()
        }

        fun animationWithDuration(duration: Double, animations: () -> Unit, completion: () -> Unit) {
            val duration = duration as? Double ?: return
            animationEnabled = true
            animations()
            animationEnabled = false
            var completed = false
            val animatingHandlers = mutableMapOf<String, () -> Unit> ()
            val animators = animationProps.values.map { aniProp ->
                var animator: ValueAnimator? = null
                (aniProp.fromValue as? Float)?.let {
                    animator = ValueAnimator.ofFloat(aniProp.fromValue as Float, aniProp.toValue as Float)
                }
                animator?.duration = (duration * 1000).toLong()
                animator?.addUpdateListener {
                    (it.animatedValue as? Float)?.let {
                        aniProp.onValue(it)
                    }
                }
                animator?.addListener(object : Animator.AnimatorListener {
                    override fun onAnimationRepeat(p0: Animator?) {}
                    override fun onAnimationEnd(p0: Animator?) {
                        animator?.removeAllListeners()
                        animator?.removeAllUpdateListeners()
                        if (!completed) {
                            completed = true
                            completion()
                        }
                    }
                    override fun onAnimationCancel(p0: Animator?) {}
                    override fun onAnimationStart(p0: Animator?) {}
                })
                animatingHandlers[aniProp.aniKey] = {
                    animator?.removeAllListeners()
                    animator?.removeAllUpdateListeners()
                    animator?.cancel()
                }
                return@map animator
            }
            animationProps = mapOf()
            XTRViewAnimator.animatingHandlers?.let {
                val mutable = it.toMutableMap()
                mutable.putAll(animatingHandlers)
                XTRViewAnimator.animatingHandlers = mutable.toMap()
            }
            animators.forEach { it?.start() }
        }

        fun animationWithBouncinessAndSpeed(bounciness: Double, speed: Double, animations: () -> Unit, completion: () -> Unit) {
            val bounciness = bounciness as? Double ?: return
            val speed = speed as? Double ?: return
            animationEnabled = true
            animations()
            animationEnabled = false
            var completed = false
            val animatingHandlers = mutableMapOf<String, () -> Unit> ()
            val springSystem = SpringSystem.create()
            animationProps.values.forEach { aniProp ->
                val spring = springSystem.createSpring()
                spring.springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed)
                (aniProp.fromValue as? Float)?.let {
                    spring.currentValue = (aniProp.fromValue as Float).toDouble()
                }
                spring.addListener(object : SimpleSpringListener() {
                    override fun onSpringUpdate(spring: Spring?) {
                        spring?.currentValue?.toFloat()?.let {
                            aniProp.onValue(it)
                        }
                    }
                    override fun onSpringAtRest(spring: Spring?) {
                        spring?.removeAllListeners()
                        spring?.destroy()
                        if (!completed) {
                            completed = true
                            completion()
                        }
                    }

                })
                animatingHandlers[aniProp.aniKey] = {
                    spring.removeAllListeners()
                    spring.destroy()
                }
                spring.endValue = (aniProp.toValue as Float).toDouble()
            }
            animationProps = mapOf()
            XTRViewAnimator.animatingHandlers = animatingHandlers.toMap()
        }

    }

}