import React, { useState, useEffect, useContext, useRef } from 'react'
import { Loader, Confirmation, Button, Modal, PageTitle, DataGrid } from '../../../../shared/components';
import moment from 'moment';
import { AuthContext } from '@contexts/auth/AuthContext';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import UsersForm from '../users-form/UsersForm';
import httpErrorHandler from '@utils/error-handler';
import { ErrorContext } from '@contexts/index';
import { Account, EmptyAccount } from '@modules/users/models/Account';
import { showLoading, showToast } from '@utils/toast';
import usersService from '@modules/users/services/users.service';
import rolesService from '@modules/settings/services/roles.service';
import { useTranslation } from 'react-i18next';
import { formateDate } from '@utils/dateFormat';
import { isAdmin } from '@utils/roles';

const Users = () => {
    const { user } = useContext(AuthContext)
    const { setError } = useContext(ErrorContext)

    const { t } = useTranslation()

    const [loading, setLoading] = useState<any>(false);
    const [accounts, setAccounts] = useState<any>(null);
    const [rolesList, setRolesList] = useState<any>(null);
    const [editUser, setEditUser] = useState<Account>(EmptyAccount);
    const [deleteUser, setDeleteUser] = useState<any>();
    const [editUserModal, setEditUserModal] = useState<any>(false);
    const [deleteUserModal, setDeleteUserModal] = useState<any>(false);
    const [mode, setMode] = useState<any>('add');
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null
    })
    const [search, setSearch] = useState<string>('')

    const getUsers = () => {
        setDataLoading(true)
        user && usersService.list({ ...dataState, search }).then(
            (res: any) => {
                setAccounts(res.data.docs)
                setTotalRecords(res.data.total)
                setDataLoading(false)
            },
            error => {
                console.log(error);
                setDataLoading(false)
            }
        )
    }

    const getOneUser = (id: string) => {
        setLoading(true)
        usersService.findOne(id).then(
            (res: any) => {
                setEditUser(res.data)
                openAddModal()
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            setError({ status, message, tryAgain: () => getOneUser(id) })
        }).finally(() => {
            setLoading(false)
        })
    }

    const removeUserAccount = () => {
        user && usersService.delete(deleteUser._id).then(
            (res) => {
                getUsers()
                closeDeleteModal()
                // Toast("SUCCESS", "User deleted successfully");
            },
            error => {
                console.log(error);
                // Toast("ERROR", "Error deleting user !");
            }
        )
    }
    const getRoles = () => {
        rolesService.findAll().then(
            (res: any) => {
                setRolesList(res.data)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            console.error(message)
        })
    }

    useEffect(() => {
        getUsers();
    }, [dataState, search]);

    useEffect(() => {
        getRoles();
    }, []);

    const onSuccess = () => {
        showToast('success', "Operation success")
    }

    const saveAccount = async () => {
        setLoading(true)
        showLoading()
        try {
            if (editUser._id) {
                await usersService.update(editUser._id, editUser)
                onSuccess()
            } else {
                await usersService.create(editUser)
                onSuccess()
            }
        } catch (error) {
            const { message } = httpErrorHandler(error);
            showToast('error', message)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date: any) => {
        return moment(date).format("DD/MM/YYYY HH:mm")
    }

    const openAddModal = () => {
        setEditUserModal(true)
    }

    const closeAddModal = () => {
        setMode('add')
        setEditUserModal(false)
        setEditUser(EmptyAccount)
    }

    const openEditModal = (data: any) => {
        setMode('edit')
        //setEditUser(data)
        getOneUser(data._id)
    }

    const openDeleteModal = (data: any) => {
        setDeleteUser(data)
        setDeleteUserModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteUserModal(false);
        setDeleteUser(null)
    }

    const onEditUserChange = (e: any) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value })
    }

    const addUserModal = (
        <Modal title='Add user' color="primary" open={editUserModal} confirm={saveAccount} cancel={closeAddModal} footerBtns >
            <UsersForm account={editUser} onChange={onEditUserChange} />
        </Modal>
    );

    const deleteModal = (
        <Confirmation open={deleteUserModal} confirm={removeUserAccount}
            cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to delete the user ?`} />
    );

    const actionRender = (data: any) => {
        return isAdmin(data.role.label) ? null : (
            <>
                <Button rounded title="Edit" onClick={() => openEditModal(data)} color="primary">
                    <FaEdit size="14px" />
                </Button>
                <Button rounded title="Delete" onClick={() => openDeleteModal(data._id)} color="secondary">
                    <FaTrash size="14px" />
                </Button>
            </>
        )
    }

    const primeColumns = [
        { field: 'displayName', header: 'Name', filter: true, sortable: true },
        { field: 'email', header: 'Email', filter: true, sortable: true },
        { field: 'role.label', header: 'Role', filter: true, sortable: true },
        { field: 'createdAt', header: 'Created at', body: (data: any) => formateDate(data.createdAt), sortable: true },
        { field: '_id', header: 'Action', body: actionRender }
    ];

    const onPage = (event: any) => {
        console.log(event)
        setDataState({
            ...dataState,
            page: event.page + 1,
            limit: event.rows,
            first: event.first
        })
    }


    const dataTable = (
        <div className="card">
            <DataGrid
                paginated
                columns={primeColumns}
                list={accounts}
                sortField={dataState.sortField}
                sortOrder={dataState.sortOrder}
                onSort={(data: any) => setDataState({ ...dataState, sortField: data.sortField, sortOrder: data.sortOrder })}
                loading={dataLoading}
                onFilter={(e: any) => console.log("FILTER EVENT : ", e)}
                first={dataState.first}
                limit={dataState.limit}
                onPage={onPage}
                totalRecords={totalRecords}
            />
        </div>
    )
    return (
        <div className="main-div">
            {addUserModal}
            {deleteModal}
            <PageTitle color="primary">{t('titles.accounts')}</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
                <Button rounded title="Add" onClick={() => openAddModal()} outline color="secondary">
                    <FaPlus size="14px" />
                </Button>
            </div>
            {accounts ? dataTable : (<Loader />)}
        </div>
    )
}

export default Users
