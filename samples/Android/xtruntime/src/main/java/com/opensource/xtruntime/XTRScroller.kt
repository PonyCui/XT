//package com.opensource.xtruntime
//
///**
// * Created by cuiminghui on 2017/9/13.
// */
//
//class XTRScroller(val callback: (left: Double, top: Double, zoom: Double) -> Unit, val options: Options = Options()) {
//
//    class Options {
//
//        var scrollingX = true
//        var scrollingY = true
//        var animating = true
//        var animationDuration = 250
//        var bouncing = true
//        var locking = true
//        var paging = false
//        var snapping = false
//        var zooming = false
//        var minZoom = 0.5
//        var maxZoom = 3.0
//        var speedMultiplier = 1.0
//        var scrollingComplete: (() -> Unit)? = null
//        var decelerationRate = 0.95
//        var penetrationDeceleration  = 0.03
//        var penetrationAcceleration  = 0.08
//
//    }
//
//    class Touch(val pageX: Double, val pageY: Double)
//    class Position(val left: Double, val top: Double, val timestamp: Long)
//
//    fun easeOutCubic(pos: Double): Double {
//        return (Math.pow((pos - 1), 3.0) + 1)
//    }
//
//    fun easeInOutCubic(pos: Double): Double {
//        val dPos = pos / 0.5
//        if ((dPos) < 1) {
//            return 0.5 * Math.pow(dPos, 3.0)
//        }
//        return 0.5 * (Math.pow((pos - 2), 3.0) + 2)
//    }
//
//    private var __isSingleTouch = false
//    private var __isTracking = false
//    private var __didDecelerationComplete = false
//    private var __isGesturing = false
//    private var __isDragging = false
//    private var __isDecelerating = false
//    private var __isAnimating = false
//    private var __clientLeft = 0.0
//    private var __clientTop = 0.0
//    private var __clientWidth = 0.0
//    private var __clientHeight = 0.0
//    private var __contentWidth = 0.0
//    private var __contentHeight = 0.0
//    private var __snapWidth = 100.0
//    private var __snapHeight = 100.0
//    private var __refreshHeight: Double? = null
//    private var __refreshActive = false
//    private var __refreshActivate: Double? = null
//    private var __refreshDeactivate: Double? = null
//    private var __refreshStart: Double? = null
//    private var __zoomLevel = 1.0
//    private var __scrollLeft = 0.0
//    private var __scrollTop = 0.0
//    private var __maxScrollLeft = 0.0
//    private var __maxScrollTop = 0.0
//    private var __scheduledLeft = 0.0
//    private var __scheduledTop = 0.0
//    private var __scheduledZoom = 0.0
//    private var __lastTouchLeft: Double? = null
//    private var __lastTouchTop: Double? = null
//    private var __lastTouchMove: Long? = null
//    private var __positions: List<Double> = listOf()
//    private var __minDecelerationScrollLeft: Double? = null
//    private var __minDecelerationScrollTop: Double? = null
//    private var __maxDecelerationScrollLeft: Double? = null
//    private var __maxDecelerationScrollTop: Double? = null
//    private var __decelerationVelocityX: Double? = null
//    private var __decelerationVelocityY: Double? = null
//
//    fun setDimensions(clientWidth: Double, clientHeight: Double, contentWidth: Double, contentHeight: Double) {
//        if (clientWidth === +clientWidth) {
//            this.__clientWidth = clientWidth
//        }
//        if (clientHeight === +clientHeight) {
//            this.__clientHeight = clientHeight
//        }
//
//        if (contentWidth === +contentWidth) {
//            this.__contentWidth = contentWidth
//        }
//
//        if (contentHeight === +contentHeight) {
//            this.__contentHeight = contentHeight
//        }
//        this.__computeScrollMax()
//        this.scrollTo(this.__scrollLeft, this.__scrollTop, true)
//    }
//
//    fun setPosition(left: Double, top: Double) {
//        this.__clientLeft = left
//        this.__clientTop = top
//    }
//
//    fun setSnapSize(width: Double, height: Double) {
//        this.__snapWidth = width
//        this.__snapHeight = height
//    }
//
//    fun getValues(): Map<String, Double> {
//        return mapOf(
//                Pair("left", __scrollLeft),
//                Pair("top", __scrollTop),
//                Pair("zoom", __zoomLevel)
//        )
//    }
//
//    fun getScrollMax(): Map<String, Double> {
//        return mapOf(
//                Pair("left", __maxScrollLeft),
//                Pair("top", __maxScrollTop),
//        )
//    }
//
//    private var __zoomComplete: (() -> Unit)? = null
//
//    fun zoomTo(argLevel: Double, animate: Boolean, argOriginLeft: Double, argOriginTop: Double, callback: (() -> Unit)?) {
//        var level = argLevel
//        var originLeft = argOriginLeft
//        var originTop = argOriginTop
//        if (!this.options.zooming) {
//            return
//        }
//        callback?.let {
//            this.__zoomComplete = callback
//        }
//        if (this.__isDecelerating) {
//            core.effect.Animate.stop(this.__isDecelerating)
//            this.__isDecelerating = false
//        }
//        var oldLevel = this.__zoomLevel
//        if (originLeft == null) {
//            originLeft = this.__clientWidth / 2
//        }
//
//        if (originTop == null) {
//            originTop = this.__clientHeight / 2
//        }
//        level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom)
//        this.__computeScrollMax(level)
//        var left = ((originLeft + this.__scrollLeft) * level / oldLevel) - originLeft
//        var top = ((originTop + this.__scrollTop) * level / oldLevel) - originTop
//        if (left > this.__maxScrollLeft) {
//            left = this.__maxScrollLeft;
//        } else if (left < 0) {
//            left = 0.0
//        }
//        if (top > this.__maxScrollTop) {
//            top = this.__maxScrollTop
//        } else if (top < 0) {
//            top = 0.0
//        }
//        this.__publish(left, top, level, animate)
//    }
//
//    fun zoomBy(factor: Double, animate: Boolean, originLeft: Double, originTop: Double, callback: (() -> Unit)?) {
//        this.zoomTo(this.__zoomLevel * factor, animate, originLeft, originTop, callback);
//    }
//
//    fun scrollTo(argLeft: Double, argTop: Double, argAnimate: Boolean, argZoom: Double? = null) {
//        var left = argLeft
//        var top = argTop
//        var zoom = argZoom
//        var animate = argAnimate
//        // Stop deceleration
//        if (this.__isDecelerating) {
//            core.effect.Animate.stop(this.__isDecelerating);
//            this.__isDecelerating = false;
//        }
//        if (zoom != null && zoom !== this.__zoomLevel) {
//            if (!this.options.zooming) {
//                return
//            }
//            left *= zoom
//            top *= zoom
//            this.__computeScrollMax(zoom)
//        } else {
//            zoom = this.__zoomLevel;
//        }
//        if (!this.options.scrollingX) {
//            left = this.__scrollLeft;
//        } else {
//            if (this.options.paging) {
//                left = Math.round(left / this.__clientWidth) * this.__clientWidth;
//            } else if (this.options.snapping) {
//                left = Math.round(left / this.__snapWidth) * this.__snapWidth;
//            }
//        }
//        if (!this.options.scrollingY) {
//            top = this.__scrollTop;
//        } else {
//            if (this.options.paging) {
//                top = Math.round(top / this.__clientHeight) * this.__clientHeight;
//            } else if (this.options.snapping) {
//                top = Math.round(top / this.__snapHeight) * this.__snapHeight;
//            }
//        }
//        left = Math.max(Math.min(this.__maxScrollLeft, left), 0.0)
//        top = Math.max(Math.min(this.__maxScrollTop, top), 0.0)
//        if (left === this.__scrollLeft && top === this.__scrollTop) {
//            animate = false
//        }
//        this.__publish(left, top, zoom, animate)
//
//    }
//
//    fun scrollBy(left: Double, top: Double, animate: Boolean) {
//        var startLeft = if (this.__isAnimating) this.__scheduledLeft else this.__scrollLeft;
//        var startTop = if (this.__isAnimating) this.__scheduledTop else this.__scrollTop;
//        this.scrollTo(startLeft + left, startTop + top, animate)
//    }
//
//    fun doMouseZoom(wheelDelta: Double, timeStamp: Long, pageX: Double, pageY: Double) {
//        var change = if (wheelDelta > 0) 0.97 else 1.03
//        return this.zoomTo(this.__zoomLevel * change, false, pageX - this.__clientLeft, pageY - this.__clientTop, null)
//    }
//
//    private var __interruptedAnimation = false
//    private var __initialTouchLeft = 0.0
//    private var __initialTouchTop = 0.0
//    private var __zoomLevelStart = 0.0
//    private var __lastScale: Double = 1.0
//    private var __enableScrollX = false
//    private var __enableScrollY = false
//
//    fun doTouchStart(touches: List<Touch>, timeStamp: Long) {
//        this.__interruptedAnimation = true
//        if (this.__isDecelerating) {
//            core.effect.Animate.stop(this.__isDecelerating)
//            this.__isDecelerating = false
//            this.__interruptedAnimation = true
//        }
//        if (this.__isAnimating) {
//            core.effect.Animate.stop(this.__isAnimating)
//            this.__isAnimating = false
//            this.__interruptedAnimation = true
//        }
//        var currentTouchLeft: Double
//        var currentTouchTop: Double
//        var isSingleTouch = touches.size === 1
//        if (isSingleTouch) {
//            currentTouchLeft = touches[0].pageX
//            currentTouchTop = touches[0].pageY
//        } else {
//            currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2
//            currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
//        }
//        this.__initialTouchLeft = currentTouchLeft
//        this.__initialTouchTop = currentTouchTop
//        this.__zoomLevelStart = this.__zoomLevel
//        this.__lastTouchLeft = currentTouchLeft
//        this.__lastTouchTop = currentTouchTop
//        this.__lastTouchMove = timeStamp
//        this.__lastScale = 1.0
//        this.__enableScrollX = !isSingleTouch && this.options.scrollingX
//        this.__enableScrollY = !isSingleTouch && this.options.scrollingY
//        this.__isTracking = true;
//        this.__didDecelerationComplete = false
//        this.__isDragging = !isSingleTouch
//        this.__isSingleTouch = isSingleTouch
//        this.__positions = listOf()
//    }
//
//    fun doTouchMove(touches: List<Touch>, timeStamp: Long, scale: Double? = null) {
//        if (!this.__isTracking) {
//            return
//        }
//        var currentTouchLeft: Double
//        var currentTouchTop: Double
//        if (touches.size === 2) {
//            currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
//            currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
//        } else {
//            currentTouchLeft = touches[0].pageX
//            currentTouchTop = touches[0].pageY
//        }
//        var positions = this.__positions.toMutableList()
//        if (this.__isDragging) {
//            var moveX = currentTouchLeft - (this.__lastTouchLeft ?: 0.0)
//            var moveY = currentTouchTop - (this.__lastTouchTop ?: 0.0)
//            var scrollLeft = this.__scrollLeft
//            var scrollTop = this.__scrollTop
//            var level = this.__zoomLevel
//            if (scale != null && this.options.zooming) {
//                var oldLevel = level
//                level = level / this.__lastScale * scale
//                level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom)
//                if (oldLevel !== level) {
//                    var currentTouchLeftRel = currentTouchLeft - this.__clientLeft
//                    var currentTouchTopRel = currentTouchTop - this.__clientTop
//                    scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel
//                    scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel
//                    this.__computeScrollMax(level)
//                }
//            }
//            if (this.__enableScrollX) {
//                scrollLeft -= moveX * this.options.speedMultiplier
//                var maxScrollLeft = this.__maxScrollLeft;
//                if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
//                    when {
//                        this.options.bouncing -> scrollLeft += (moveX / 2  * this.options.speedMultiplier)
//                        scrollLeft > maxScrollLeft -> scrollLeft = maxScrollLeft
//                        else -> scrollLeft = 0.0
//                    }
//                }
//            }
//            if (this.__enableScrollY) {
//                scrollTop -= moveY * this.options.speedMultiplier
//                var maxScrollTop = this.__maxScrollTop;
//                if (scrollTop > maxScrollTop || scrollTop < 0) {
//                    when {
//                        this.options.bouncing -> scrollTop += (moveY / 2 * this.options.speedMultiplier)
//                        scrollTop > maxScrollTop -> scrollTop = maxScrollTop
//                        else -> scrollTop = 0.0
//                    }
//                }
//            }
//            if (positions.size > 60) {
//                positions = positions.subList(29, positions.size - 1).toMutableList()
//            }
//            positions.add(scrollLeft)
//            positions.add(scrollTop)
//            positions.add(timeStamp.toDouble())
//            this.__publish(scrollLeft, scrollTop, level)
//        } else {
//            var minimumTrackingForScroll = if (this.options.locking) 3 else 0
//            var minimumTrackingForDrag = 5;
//            var distanceX = Math.abs(currentTouchLeft - this.__initialTouchLeft)
//            var distanceY = Math.abs(currentTouchTop - this.__initialTouchTop)
//            this.__enableScrollX = this.options.scrollingX && distanceX >= minimumTrackingForScroll
//            this.__enableScrollY = this.options.scrollingY && distanceY >= minimumTrackingForScroll
//            positions.add(this.__scrollLeft)
//            positions.add(this.__scrollTop)
//            positions.add(timeStamp.toDouble())
//            this.__isDragging = (this.__enableScrollX || this.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag)
//            if (this.__isDragging) {
//                this.__interruptedAnimation = false
//            }
//        }
//        this.__lastTouchLeft = currentTouchLeft
//        this.__lastTouchTop = currentTouchTop
//        this.__lastTouchMove = timeStamp
//        this.__lastScale = scale ?: this.__lastScale
//        this.__positions = positions.toList()
//    }
//
//    fun doTouchEnd(timeStamp: Long) {
//        if (!this.__isTracking) {
//            return
//        }
//        this.__isTracking = false;
//        if (this.__isDragging) {
//            this.__isDragging = false;
//            if (this.__isSingleTouch && this.options.animating && (timeStamp - (this.__lastTouchMove ?: 0)) <= 100) {
//                var positions = this.__positions
//                var endPos = positions.size - 1
//                var startPos = endPos
//
//                var i = endPos
//                while (i > 0 && positions[i] > (this.__lastTouchMove ?: 0 - 100)) {
//                    startPos = i
//                    i -= 3
//                }
//                if (startPos === endPos && positions.size > 5) {
//                    startPos = 2
//                }
//                if (startPos !== endPos) {
//                    var timeOffset = positions[endPos] - positions[startPos]
//                    var movedLeft = this.__scrollLeft - positions[startPos - 2]
//                    var movedTop = this.__scrollTop - positions[startPos - 1]
//                    this.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60)
//                    this.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60)
//                    var minVelocityToStartDeceleration = (if (this.options.paging || this.options.snapping) 4.0 else 1.0)
//                    if (Math.abs(this.__decelerationVelocityX!!) > minVelocityToStartDeceleration || Math.abs(this.__decelerationVelocityY!!) > minVelocityToStartDeceleration) {
//                        if (!this.__refreshActive) {
//                            this.__startDeceleration(timeStamp)
//                        }
//                    }
//                } else {
//                    this.options.scrollingComplete?.invoke()
//                }
//            } else if ((timeStamp - (this.__lastTouchMove ?: 0)) > 100) {
//                this.options.scrollingComplete?.invoke()
//            }
//        }
//        if (!this.__isDecelerating) {
//            if (this.__interruptedAnimation || this.__isDragging) {
//                this.options.scrollingComplete?.invoke()
//            }
//            this.scrollTo(this.__scrollLeft, this.__scrollTop, true, this.__zoomLevel);
//        }
//        this.__positions = listOf()
//
//    }
//
//    private fun __step(oldLeft: Double, diffLeft: Double, oldTop: Double, diffTop: Double, oldZoom: Double, diffZoom: Double, percent: Double) {
//        this.__scrollLeft = oldLeft + (diffLeft * percent);
//        this.__scrollTop = oldTop + (diffTop * percent);
//        this.__zoomLevel = oldZoom + (diffZoom * percent);
//        this.callback?.invoke(this.__scrollLeft, this.__scrollTop, this.__zoomLevel)
//    }
//
//    private fun __verify(id: Boolean): Boolean {
//        return this.__isAnimating == id
//    }
//
//    private fun __completed(renderedFramesPerSecond, animationId, wasFinished) {
//
//    }
//
//    private fun __publish(left: Double, top: Double, zoom: Double, animate: Boolean) {
//        var wasAnimating = this.__isAnimating
//        if (wasAnimating) {
//            core.effect.Animate.stop(wasAnimating)
//            this.__isAnimating = false
//        }
//        if (animate && this.options.animating) {
//            this.__scheduledLeft = left
//            this.__scheduledTop = top
//            this.__scheduledZoom = zoom
//            var oldLeft = this.__scrollLeft
//            var oldTop = this.__scrollTop
//            var oldZoom = this.__zoomLevel
//
//            var diffLeft = left - oldLeft
//            var diffTop = top - oldTop
//            var diffZoom = zoom - oldZoom
//
//            var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
//                if (animationId === this.__isAnimating) {
//                    this.__isAnimating = false;
//                }
//                if (this.__didDecelerationComplete || wasFinished) {
//                    this.options.scrollingComplete();
//                }
//
//                if (this.options.zooming) {
//                    this.__computeScrollMax();
//                    this.__zoomComplete?.let {
//                        it.invoke()
//                        this.__zoomComplete = null
//                    }
//                }
//            };
//            this.__isAnimating = core.effect.Animate.start(step, verify, completed, this.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
//
//        } else {
//            this.__scrollLeft = left
//            this.__scheduledLeft = left
//            this.__scrollTop = top
//            this.__scheduledTop = top
//            this.__zoomLevel = zoom
//            this.__scheduledZoom = zoom
//            this.callback?.invoke(left, top, zoom)
//            // Fix max scroll ranges
//            if (this.options.zooming) {
//                this.__computeScrollMax();
//                this.__zoomComplete?.let {
//                    it.invoke()
//                    this.__zoomComplete = null
//                }
//            }
//        }
//    }
//
//}