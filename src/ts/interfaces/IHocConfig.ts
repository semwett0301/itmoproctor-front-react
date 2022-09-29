import {FC} from "react";
import {HocProps} from "../types/HocProps";
import {HocData} from "../types/HocData";

export interface IHocParameter<T> {
    id: number,
    value: FC<HocProps<T>>,
}

export interface IHocConfig<T> {
    hoc: FC<HocProps<T>> | IHocParameter<T>[],
    data: HocData<T>[]
}
