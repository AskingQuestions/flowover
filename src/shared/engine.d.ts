type ItemContext = {
    transitionDuration: number;
    transitionTimer: number;
    transitionDelay: number;
    transitionTimingFunction: (t: number) => number;
    currentTransform: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    fromTransform: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    targetTransform: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    currentSlot: HTMLElement | null;
    currentSlotName: string | null;
    id: number;
};
type Item = HTMLElement & {
    $flowover?: ItemContext;
};
type FlowoverGlobalState = {
    items: Item[];
    isDirty: boolean;
    idCounter: number;
    setDirty: () => void;
    ghosts: HTMLElement[];
    lastFrameTime: number;
};
declare global {
    interface Window {
        $flowover?: FlowoverGlobalState;
    }
}
export declare function getFlowover(): FlowoverGlobalState;
export declare function registerFlowItem(item: Item): void;
export {};
