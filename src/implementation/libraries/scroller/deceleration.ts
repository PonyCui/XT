import { QuadraticEaseOut, Animation } from "./animation";
import { Scroller } from "./scroller";
import * as Rebound from 'rebound'

function Clamp(v: number, min: number, max: number): number {
    return (v < min) ? min : (v > max) ? max : v;
}

function ClampedVelocty(v: number): number {
    const V: number = 200;
    return Clamp(v, -V, V);
}

function BounceComponent(scroller: Scroller, c: AnimationDecelerationComponent, deltaTime: number): boolean {
    if (c.bounced && c.bouncedReturnTime > 0) {
        if (c.position < c.bounceLeft) {
            const deltaPosition = 0.0 + (-c.velocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedReturnTime)))
            c.position = Math.min(c.bounceLeft, c.bouncedReturnPosition + deltaPosition / 5.0)
            return c.position >= c.bounceLeft
        }
        else if (c.position > c.bounceRight) {
            const deltaPosition = 0.0 + (-c.velocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedReturnTime)))
            c.position = Math.max(c.bounceRight, c.bouncedReturnPosition + deltaPosition / 5.0)
            return c.position <= c.bounceRight
        }
        return true
    }
    else if (c.bounced && c.bouncedStartTime > 0) {
        if (c.position < c.bounceLeft) {
            const deltaPosition = 0.0 + (c.velocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedStartTime)))
            if (Math.abs(c.position - (c.bounceLeft + deltaPosition / 5.0)) < 0.5) {
                BounceReturn(scroller, c, deltaTime)
            }
            else {
                c.position = c.bounceLeft + deltaPosition / 5.0
            }
            return false
        }
        else if (c.position > c.bounceRight) {
            const deltaPosition = 0.0 + (c.velocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedStartTime)))
            if (Math.abs(c.position - (c.bounceRight + deltaPosition / 5.0)) < 0.5) {
                BounceReturn(scroller, c, deltaTime)
            }
            else {
                c.position = c.bounceRight + deltaPosition / 5.0
            }
            return false
        }
        return true
    }
    else {
        c.position = c.from + (c.velocity / (1 - scroller.decelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.decelerationRate) * deltaTime))
        if (c.position < c.bounceLeft || c.position > c.bounceRight) {
            c.bounced = true
            c.bouncedStartTime = deltaTime
        }
        return Math.abs(c.position - (c.from + (c.velocity / (1 - scroller.decelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.decelerationRate) * Infinity)))) < 1.0
    }
}

function BounceReturn(scroller: Scroller, component: AnimationDecelerationComponent, returnTime: number) {
    component.bounced = true;
    component.bouncedReturnTime = returnTime
    component.bouncedReturnPosition = component.position
    let velocityValue = 1.0
    while (true) {
        if (component.position < component.bounceLeft) {
            if (((velocityValue / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) / 5.0) > (component.bounceLeft - component.position)) {
                break
            }
            else {
                velocityValue *= 1.1
            }
        }
        else if (component.position > component.bounceRight) {
            if (((velocityValue / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) / 5.0) > (component.position - component.bounceRight)) {
                break
            }
            else {
                velocityValue *= 1.1
            }
        }
    }
    component.velocity = component.position < component.bounceLeft ? -velocityValue : velocityValue
}

export class AnimationDecelerationComponent {
    from: number = 0.0;
    position: number = 0.0;
    velocity: number = 0.0;
    bounced: boolean = false;
    bouncedStartTime: number = 0;
    bouncedReturnTime: number = 0;
    bouncedReturnPosition: number = 0;
    bounce: boolean = false;
    bounceLeft: number = 0.0;
    bounceRight: number = 0.0;
};

export class AnimationDeceleration extends Animation {

    x: AnimationDecelerationComponent = new AnimationDecelerationComponent()
    y: AnimationDecelerationComponent = new AnimationDecelerationComponent()
    lastMomentumTime: number

    constructor(readonly scroller: Scroller, velocity: { x: number, y: number }) {
        super(scroller)
        this.lastMomentumTime = this.beginTime
        this.x.from = scroller.contentOffset.x;
        this.x.velocity = ClampedVelocty(velocity.x);
        this.x.position = scroller.contentOffset.x;
        this.x.bounced = false;
        this.x.bounce = scroller.bounces
        this.x.bounceLeft = 0.0
        this.x.bounceRight = Math.max(0.0, scroller.contentSize.width - scroller.bounds.width)
        if (this.x.position < this.x.bounceLeft || this.x.position > this.x.bounceRight) {
            BounceReturn(scroller, this.x, 0.001)
        }
        this.y.from = scroller.contentOffset.y;
        this.y.velocity = ClampedVelocty(velocity.y);
        this.y.position = scroller.contentOffset.y;
        this.y.bounced = false;
        this.y.bounce = scroller.bounces
        this.y.bounceLeft = 0.0
        this.y.bounceRight = Math.max(0.0, scroller.contentSize.height - scroller.bounds.height)
        if (this.y.position < this.y.bounceLeft || this.y.position > this.y.bounceRight) {
            BounceReturn(scroller, this.y, 0.001)
        }
    }

    animate(): boolean {
        const currentTime = Animation.currentTime()
        const verticalIsFinished = BounceComponent(this.scroller, this.y, currentTime - this.beginTime);
        const horizontalIsFinished = BounceComponent(this.scroller, this.x, currentTime - this.beginTime);
        this.scroller.contentOffset = { x: this.x.position, y: this.y.position }
        return verticalIsFinished && horizontalIsFinished;
    }

    momentumScrollBy(delta: { x: number, y: number }) { }

}