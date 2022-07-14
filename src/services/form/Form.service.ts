import { api } from "../api"
import { IJuscashData } from "./types"


const FormServices = {
    getData: async (): Promise<IJuscashData> => {
        const {data } = await api.get<IJuscashData>('/juscash')
        return data;
    }
}

export {FormServices}