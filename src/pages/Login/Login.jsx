
    import * as React from "react";
    import ModelJsonSchema from "./Login.schema.json";
    import mockData from "./data.json";
    import { useBoolean } from './../../hooks';
    import { AddDrawer } from "../../components/common/AddDrawer";
    import { EditDrawer } from "../../components/common/EditDrawer";
    import { Confirmation } from "../../components/common/Confirmation";
    import { errorToast,successToast } from "../../utils/notifications";
    import LoginTable from "./LoginTable";
    import { ACTION_TYPE } from "../../constant/common";
    import { checkPermission } from "../../api/general";
    import { isMocking } from "../../utils/utils";
  
    const formSchema = {
      databaseType: process.env.REACT_APP_DATABASE_TYPE,
      screenLayout:ModelJsonSchema.screenLayout,
      attributes:ModelJsonSchema.actions.find(action => action.category === 'addEdit')?.attributes || []
    }
  
    const Login = ({
      addRecord,
      editRecord,
      deleteRecord,
      deleteRecords
    }) => {
        
        const [addModal,showAddModal,hideAddModal] = useBoolean(false);
        const [editModal,showEditModal,hideEditModal] = useBoolean(false);
        const [deleteModal,showDeleteModal,hideDeleteModal] = useBoolean(false);
        const [actionType, setActionType] = React.useState(null);
        
        const currentRecord = React.useRef({});
        const selectedRows = React.useRef({});
        
        const onViewRecord = React.useCallback((record)=>{
          record.id && window.open(`login/${record.id}`, "_blank");
        },[]);
      
        const onDelete = React.useCallback((record) => {
          setActionType(ACTION_TYPE.DELETE)
          currentRecord.current = record;
          showDeleteModal();
        },[]);
  
        const onMultiDelete = React.useCallback((selectedIds) => {
          setActionType(ACTION_TYPE.MULTIDELETE)
          selectedRows.current = selectedIds;
          showDeleteModal();
        },[]);
      
        const onEdit = React.useCallback((record) => {
          currentRecord.current = record;
          showEditModal();
        },[])
      
      
        const onCustomActionClick = React.useCallback((actionName, record) => {
          alert(actionName+" action clicked");
        },[]);
  
        return (
          <React.Fragment>
          
            <LoginTable
              mockData={mockData.data}
              onCustomActionClick={onCustomActionClick}
              onAdd={showAddModal}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onViewRecord}
              onMultiDelete={onMultiDelete}
              noAdd={!isMocking && !checkPermission({permissionType:'C',modelName:ModelJsonSchema.name})}
              noView={!isMocking && !checkPermission({permissionType:'R',modelName:ModelJsonSchema.name})}
              noEdit={!isMocking && !checkPermission({permissionType:'U',modelName:ModelJsonSchema.name})}
              noDelete={!isMocking && !checkPermission({permissionType:'D',modelName:ModelJsonSchema.name})}
            />
  
            <AddDrawer
              onSubmit={record => {
                addRecord(record)
                .then(successToast)
                .catch(errorToast)
                .finally(hideAddModal)
              }}
              schema={formSchema}
              open={addModal}
              onClose={hideAddModal}
            />
            <EditDrawer
              schema={formSchema}
              currentData={currentRecord.current}
              open={editModal}
              onClose={hideEditModal}
              onSubmit={record => {
                editRecord({ ...record, id: currentRecord.current.id })
                  .then(successToast)
                  .catch(errorToast)
                  .finally(hideEditModal);
              }}
            />
            <Confirmation
          handleSubmit={() => {
            actionType===ACTION_TYPE.DELETE && 
            currentRecord.current.id &&
              deleteRecord({ id: currentRecord?.current?.id })
              .then(successToast)
              .catch(errorToast)
              .finally(hideDeleteModal);
            actionType===ACTION_TYPE.MULTIDELETE &&
            selectedRows.current && 
              deleteRecords({ ids: selectedRows.current })
                .then(successToast)
                .catch(errorToast)
                .finally(hideDeleteModal);
          }}
          handleCancel={hideDeleteModal}
          isOpen={deleteModal}
          OkText="Delete"
        />
  
          </React.Fragment>
        );
      };
      
      export default Login;
    