
export interface Inspectable {

    name: string;
    props: InspectorBaseProperty[];

}

export class InspectorBaseProperty {
    
    name: string;

}

export class InspectorStringProperty extends InspectorBaseProperty {

    defaultValue: string;
    placeholder: string;

}

export class InspectorNumberProperty extends InspectorBaseProperty {

    defaultValue: number;
    placeholder: string;
    minValue?: number;
    maxValue?: number;

}