
        import { apiClient } from "./../api/client";
        import { API_URLS } from "../api/config";
        const {Login} = API_URLS;

        export const listLogins = (payload) =>{
            return apiClient({ url: Login.list, data: payload })
            .then((res) => res?.data)
            .catch((err) => {
              throw new Error(err);
            });
          } 
        
        export const createLogin = (payload) =>{
            return apiClient({ url: Login.create, data: payload })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err?.data?.message);
            });
        }

        export const updateLogin = (payload) =>{
            return apiClient({ url: Login.update + payload.id, data: payload,
                method: "PUT" })
            .then((res) => res.data)
            .catch((err) => {
              throw new Error(err?.data?.message || "Can't update record.");
            });
        }

        export const softDeleteLogin = (payload) =>{
            return apiClient({ url: Login.softdelete + payload.id, data: payload,
                method: "PUT" })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const deleteLogin = (payload) =>{
            return apiClient({ url: Login.delete + payload.id, data: payload,
                method: "DELETE" })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getLoginCount = () =>{
            return apiClient({ url: Login.count })
            .then((res) => res.data?.totalRecords || 0)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getLoginAggregate = (payload) =>{
            return apiClient({ url: Login.aggregation ,data: payload})
            .then((res) => res.data?.data)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const getLoginById = (payload) =>{
            return apiClient({ url: Login.singlerecord + payload ,data: { query: { isActive: true, isDeleted: false } },
                method: "GET",})
            .then((res) => res.data)
            .catch((err) => {
              throw new Error(err);
            });
        }

        export const softDeleteMultipleLogin = (payload) => {
          return apiClient({
            url: Login.multisoftdelete,
            data: payload,
            method: "PUT",
          })
            .then((res) => res)
            .catch((err) => {
              throw new Error(err);
            });
        };

    