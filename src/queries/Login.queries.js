
  import { useQuery, useQueryClient, useMutation } from "react-query";
  import {listLogins,createLogin,updateLogin,softDeleteLogin,softDeleteMultipleLogin,deleteLogin,getLoginAggregate,getLoginById,getLoginCount} from '../services/Login.service';

  function useLoginList(args){
    const { page, limit } = args.options;
    let $and = [],sort = {};

    if(args.query?.$and) {
      $and = { ...args.query?.$and };
    }
    if(args.options?.sort) {
      sort = { ...args.options?.sort };
    }
    return useQuery(["Login", { page, limit, $and, sort }],
    ()=>listLogins(args))
  }
  
  function useLoginCreate(){
    const queryClient = useQueryClient();
    return useMutation(
      record => createLogin(record),
      {
        onMutate: async (newRecord) => {
          await queryClient.cancelQueries(['Login']);
    
          const previousValue = queryClient.getQueryData(['Login']) || [];
    
          queryClient.setQueryData(['Login'], () => [...previousValue, newRecord]);
          return previousValue;
        },
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['Login'], previousValue),
        // After success or failure, refetch the Logins query
        onSettled: () => {
          queryClient.invalidateQueries(['Login']);
        },
      }
    )
  }
  
  function useLoginUpdate(){
    const queryClient = useQueryClient();
    return useMutation(
      record => updateLogin(record),
      {
        onMutate: async (updatedData) => {
          await queryClient.cancelQueries(['Login']);
  
          const previousValue = queryClient.getQueryData(['Login']);
  
          queryClient.setQueryData(['Login'], (old) => {
            return old?.map((oldData) => {
              if (oldData.id === updatedData.id) return updatedData;
              else return oldData;
            });
          });
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['Login'], previousValue),
        // After success or failure, refetch the Logins query
        onSettled: () => {
          queryClient.invalidateQueries(['Login']);
        },
      }
    )
  }
  
  function useLoginSoftDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => softDeleteLogin(record),
      {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['Login']);
  
          const previousValue = queryClient.getQueryData(['Login']) || [];
          queryClient.setQueryData(['Login'], oldData => previousValue.filter(record => record.id !== deletedRecord.id));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['Login'], previousValue),
        // After success or failure, refetch the Logins query
        onSettled: () => {
          queryClient.invalidateQueries(['Login']);
        },
      }
    );
  }

  function useLoginMultipleSoftDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => softDeleteMultipleLogin(record),
      {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['Login']);
  
          const previousValue = queryClient.getQueryData(['Login']) || [];
          queryClient.setQueryData(['Login'], oldData => previousValue.filter(record => !deletedRecord.ids.includes(record.id)));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['Login'], previousValue),
        // After success or failure, refetch the Logins query
        onSettled: () => {
          queryClient.invalidateQueries(['Login']);
        },
      }
    );
  }
  
  function useLoginDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => deleteLogin(record),
    {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['Login']);
  
          const previousValue = queryClient.getQueryData(['Login']) || [];
          queryClient.setQueryData(['Login'], oldData => previousValue.filter(record => record.id !== deletedRecord.id));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['Login'], previousValue),
        // After success or failure, refetch the Logins query
        onSettled: () => {
          queryClient.invalidateQueries(['Login']);
        },
      }
    );
  }
  
  function useLoginCount() {
    return useQuery(["LoginCount"],()=>{
      return getLoginCount();
    })
  }
  
  function useLoginAggregate(record) {
    return useQuery("Login", () => {
      return getLoginAggregate(record);
    });
  }
  
  function useLoginGetById(id) {
    return useQuery(['Login',id], () => {
      return getLoginById(id);
    }
    );
  }
  
  export {
    useLoginList,
    useLoginCreate,
    useLoginUpdate,
    useLoginDelete,
    useLoginMultipleSoftDelete,
    useLoginCount,
    useLoginSoftDelete,
    useLoginAggregate,
    useLoginGetById,
  };
  