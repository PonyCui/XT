import { Color } from "./Color";

export class RefreshControl {

    enabled: boolean
    color: Color
    readonly isRefreshing: boolean
    endRefreshing(): void { }
    onRefresh?: () => void

}