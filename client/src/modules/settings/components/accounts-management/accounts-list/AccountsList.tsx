import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import accountsService from '@modules/settings/services/accounts.service';
import { Button, Confirmation, DataGrid, Loader, PageTitle } from '@shared/components';
import { httpErrorHandler, showToast } from 'src/utils';
import { formateDate } from '@utils/dateFormat';


const AccountsList = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    const [loading, setLoading] = useState<any>(false);
    const [accounts, setAccounts] = useState<any>(null);
    const [archiveModal, setArchiveModal] = useState<boolean>(false);
    const [archiveAccount, setArchiveAccount] = useState<string>();
    const [search, setSearch] = useState<string>('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null
    })

    const getList = () => {
        setLoading(true)
        accountsService.list({...dataState, search}).then(
          (res: any) => {
            setAccounts(res.data.docs)
            setTotalRecords(res.data.total)
          }
        ).catch(error => {
          console.error(error)
        }).finally(() => {
          setLoading(false)
        })
    }

    useEffect(() => {
        getList();
    }, [dataState, search]);

    const archive = async () => {
        try{
            await accountsService.delete(archiveAccount!)
            closeArchiveModal()
            showToast('success', "Operation success")
            getList()
        } catch (error) {
            const { message } = httpErrorHandler(error);
            showToast('error', message)
        }
    }

    const openArchiveModal = (id: string) => {
        setArchiveModal(true)
        setArchiveAccount(id)
    }

    const closeArchiveModal = () => {
        setArchiveModal(false)
        setArchiveAccount('')
    }

    const _archiveModal = (
        <Confirmation open={archiveModal} confirm={archive}
            cancel={closeArchiveModal} color="secondary" text={`Are you sure you want to delete this account ?`} />
    );

    const actionRender = (data: any) => (
        <>
            <Button rounded title="Edit" onClick={() => navigate(data._id)} color="primary">
                <FaEdit size="14px" />
            </Button>
            <Button rounded title="Delete" onClick={() => openArchiveModal(data._id)} color="secondary">
                <FaTrash size="14px" />
            </Button>
        </>
    )

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
                loading={loading}
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
            {_archiveModal}
            <PageTitle color="primary">{t('titles.accounts')}</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
                <Button rounded title="Add" onClick={() => navigate('add')} outline color="secondary">
                    <FaPlus size="14px" />
                </Button>
            </div>
            {accounts ? dataTable : (<Loader />)}
        </div>
    )
}

export default AccountsList