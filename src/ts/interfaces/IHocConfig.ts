import {FC} from "react";
import {HocProps} from "../types/HocProps";
import {HocData} from "../types/HocData";

export interface IHocParameter<T> {
    id: number,
    hoc: FC<HocProps<T>>,
}

export interface IHocConfig<T> {
    id: number,
    value: IHocParameter<T> | IHocParameter<T>[],
    data: HocData<T>[]
}
