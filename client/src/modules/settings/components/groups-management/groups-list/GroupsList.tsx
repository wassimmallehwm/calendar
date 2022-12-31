import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaEdit, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from 'src/contexts';
import { Group, EmptyGroup } from '@modules/settings/models/Group';
import groupsService from '@modules/settings/services/groups.service';
import { Button, Confirmation, DataGrid, Loader, Modal, PageTitle } from '@shared/components';
import { httpErrorHandler, showLoading, showToast } from 'src/utils';
import { formateDate } from '@utils/dateFormat';
import GroupsForm from '../groups-form/GroupsForm';
import { useModal } from '@hooks/index';
import GroupsUsers from '../groups-users/GroupsUsers';

const GroupsList = () => {
    const { t } = useTranslation();
    const { setError } = useContext(ErrorContext)

    const navigate = useNavigate()

    const [loading, setLoading] = useState<any>(false);
    const [groups, setGroups] = useState<Group[]>();

    const [archiveModal, setArchiveModal] = useState<boolean>(false);
    const [archiveId, setArchiveId] = useState<string>();

    const [addModal, setAddModal] = useState<boolean>(false);
    const [group, setGroup] = useState<Group>();

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

    const usersModal = useModal({
        title: group?.label || '',
        modalBtns: false,
        fixedHeight: true,
        content: <GroupsUsers group={group!}/>
    })

    const getList = () => {
        setLoading(true)
        groupsService.list({ ...dataState, search }).then(
            res => {
                setGroups(res.data.docs)
                setTotalRecords(res.data.total)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            setError({ status, message, tryAgain: () => getList() })
        }).finally(() => {
            setLoading(false)
        })
    }

    const save = () => {
        showLoading()
        groupsService.save(group!).then(
            res => {
                getList();
                showToast('success', t("success.save"))
            }
        ).catch(error => {
            showToast('error', t("error.save"))
        }).finally(() => {
            closeAddModal()
        })
    }

    useEffect(() => {
        getList();
    }, [dataState, search]);

    const onChange = (e: any) => {
        setGroup({ ...group, [e.target.name]: e.target.value })
    }

    const archive = async () => {
        try {
            showLoading()
            await groupsService.delete(archiveId!)
            closeArchiveModal()
            showToast('success', t("success.delete"))
            getList()
        } catch (error) {
            const { message } = httpErrorHandler(error);
            showToast('error', t("error.delete"))
        }
    }

    const openAddModal = (data: Group = EmptyGroup) => {
        setAddModal(true)
        data && setGroup(data)
    }

    const closeAddModal = () => {
        setAddModal(false)
        setGroup(undefined)
    }

    const openArchiveModal = (id: string) => {
        setArchiveModal(true)
        setArchiveId(id)
    }

    const closeArchiveModal = () => {
        setArchiveModal(false)
        setArchiveId('')
    }

    const openUsersModal = (data: any) => {
        setGroup(data)
        usersModal.openModal()
    }

    const _archiveModal = (
        <Confirmation open={archiveModal} confirm={archive}
            cancel={closeArchiveModal} color="secondary" text={`Are you sure you want to delete this Group ?`} />
    );

    const _addModal = (
        <Modal title='Group' color="primary" open={addModal} confirm={save} cancel={closeAddModal} footerBtns >
            <GroupsForm group={group!} onChange={onChange} />
        </Modal>
    );

    const actionRender = (data: any) => (
        <>
            <Button rounded title="Edit" onClick={() => openUsersModal(data)} color="primary">
                <FaUsers size="14px" />
            </Button>
            <Button rounded title="Edit" onClick={() => openAddModal(data)} color="primary">
                <FaEdit size="14px" />
            </Button>
            <Button rounded title="Delete" onClick={() => openArchiveModal(data._id)} color="secondary">
                <FaTrash size="14px" />
            </Button>
        </>
    )

    const primeColumns = [
        { field: 'label', header: 'Label', filter: true, sortable: true },
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
                list={groups!}
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
            {_addModal}
            {_archiveModal}
            {usersModal.modal}
            <PageTitle color="primary">{t('titles.groups')}</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
                <Button rounded title="Add" onClick={() => openAddModal()} outline color="secondary">
                    <FaPlus size="14px" />
                </Button>
            </div>
            {groups ? dataTable : (<Loader />)}
        </div>
    )
}

export default GroupsList