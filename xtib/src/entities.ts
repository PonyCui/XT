
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
    valueChanged: (value: string) => void;

}

export class InspectorNumberProperty extends InspectorBaseProperty {

    defaultValue: number;
    placeholder: string;
    minValue?: number;
    maxValue?: number;
    valueChanged: (value: number) => void;

}

export class InspectorBooleanProperty extends InspectorBaseProperty {

    defaultValue: boolean;
    valueChanged: (value: boolean) => void;

}

export class InspectorEnumProperty extends InspectorBaseProperty {

    defaultValue: number;
    enumOptions: { [key: number]: string }
    valueChanged: (value: number) => void;

}

export class InspectorFourNumberProperty extends InspectorBaseProperty {

    fourNames: string[];
    fourDefaultValue: number[];
    valueChanged: (value: number[]) => void;

}

export class InspectorHRProperty extends InspectorBaseProperty { }

export class BaseLayer {

    name: string = ""
    children: BaseLayer[] = []

}