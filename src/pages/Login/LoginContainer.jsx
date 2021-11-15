
    import React from 'react';
    import { useLoginCreate, useLoginSoftDelete,useLoginMultipleSoftDelete, useLoginUpdate } from '../../queries/Login.queries';
    import Login from './Login';
    
    const LoginContainer = () => {
    
      const {mutate:addRecord} = useLoginCreate();
      const {mutate:editRecord} = useLoginUpdate();
      const {mutate:deleteRecord} = useLoginSoftDelete();
      const {mutate:deleteRecords} = useLoginMultipleSoftDelete();
    
      const onAddRecord = (record) => {
        return new Promise((resolve,reject) => {
          addRecord(record, {
            onSuccess: async () => resolve('Record created successfully.'),
            onError: async (error) => reject(error?.message),
          });
        })
      };
    
      const onEditRecord = (record) => {
        return new Promise((resolve, reject) => {
          editRecord(
            record,
            {
              onSuccess: async () => resolve('Record updated successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };
    
      const onDeleteRecord = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecord(
            record, 
            {
              onSuccess: async () => resolve('Record deleted successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };

      const onMultiDelete = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecords(
            record, 
            {
              onSuccess: async () => resolve('Records deleted successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };

      return (
        <Login 
          addRecord={onAddRecord}
          deleteRecord={onDeleteRecord}
          deleteRecords={onMultiDelete}
          editRecord={onEditRecord}
        />
      )
    }
    
    export default LoginContainer;
    