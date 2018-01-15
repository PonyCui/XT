import { QuadraticEaseOut, Animation } from "./animation";
import { Scroller } from "./scroller";
import * as Rebound from 'rebound'

const minimumBounceVelocityBeforeReturning: number = 100;
const returnAnimationDuration: number = 0.33;
const physicsTimeStep: number = 1.0 / 120.0;
const springTightness: number = 7;
const springDampening: number = 15;

function Clamp(v: number, min: number, max: number): number {
    return (v < min) ? min : (v > max) ? max : v;
}

function ClampedVelocty(v: number): number {
    const V: number = 200;
    return Clamp(v, -V, V);
}

function Spring(velocity: number, position: number, restPosition: number, tightness: number, dampening: number): number {
    const d: number = position - restPosition;
    return (-tightness * d) - (dampening * velocity);
}

function BounceComponent(scroller: Scroller, c: AnimationDecelerationComponent, deltaTime: number): boolean {
    if (c.bounced && c.bouncedReturnTime > 0) {
        const deltaPosition = c.bouncedReturnPosition + (-(c.velocity / 2.0) / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedReturnTime)))
        c.position = 0.0 + deltaPosition
        return c.position >= 0.0
    }
    else if (c.bounced && c.bouncedStartTime > 0) {
        const deltaPosition = 0.0 + (c.velocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * (deltaTime - c.bouncedStartTime)))
        if (Math.abs(c.position - (0.0 + deltaPosition / 2.0)) < 0.5) {
            c.bouncedReturnTime = deltaTime
            c.bouncedReturnPosition = 0.0 + deltaPosition / 2.0
        }
        else {
            c.position = 0.0 + deltaPosition / 2.0
        }
        return false
    }
    else {
        c.position = c.from + (c.velocity / (1 - scroller.decelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.decelerationRate) * deltaTime))
        if (c.position < c.bounceLeft) {
            c.bounced = true
            c.bouncedStartTime = deltaTime
        }
        return Math.abs(c.position - (c.from + (c.velocity / (1 - scroller.decelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.decelerationRate) * Infinity)))) < 1.0
    }
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
        this.y.from = scroller.contentOffset.y;
        this.y.velocity = ClampedVelocty(velocity.y);
        this.y.position = scroller.contentOffset.y;
        this.y.bounced = false;
        this.y.bounce = scroller.bounces
        this.y.bounceLeft = 0.0
        this.y.bounceRight = scroller.contentSize.height - scroller.bounds.height
        if (this.x.velocity == 0) {
            this.x.bounced = true;
        }
        if (this.y.velocity == 0) {
            this.y.bounced = true;
        }
    }

    animate(): boolean {
        const currentTime = Animation.currentTime()
        const isFinishedWaitingForMomentumScroll = ((currentTime - this.lastMomentumTime) > 0.15);
        let confinedOffset = this.scroller._confinedContentOffset({ x: this.x.position, y: this.y.position })
        const verticalIsFinished = BounceComponent(this.scroller, this.y, currentTime - this.beginTime);
        const horizontalIsFinished = BounceComponent(this.scroller, this.x, currentTime - this.beginTime);
        const finished = (verticalIsFinished && horizontalIsFinished && isFinishedWaitingForMomentumScroll);
        this.scroller.contentOffset = { x: this.x.position, y: this.y.position }
        return verticalIsFinished;
    }

    momentumScrollBy(delta: { x: number, y: number }) { }

}