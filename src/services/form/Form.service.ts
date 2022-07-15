import { api } from "../api"
import { IJuscashData, IPayloadPrediction } from "./types"


const FormServices = {
    getData: async (): Promise<IJuscashData> => {
        const {data } = await api.get<IJuscashData>('/juscash')
        return data;
    },

    getPrediction: async (payload: IPayloadPrediction): Promise<number> => {
        const  {data} = await api.post<number>('/juscash', payload)
        return data;
    }
}

export {FormServices}