import {AxiosResponse} from 'axios';

export const deleteSelected = async (selected: string[], requestFunction: (id: string) => Promise<AxiosResponse>): Promise<AxiosResponse[]> =>
  Promise.all(selected.map((item) => requestFunction(item)))
