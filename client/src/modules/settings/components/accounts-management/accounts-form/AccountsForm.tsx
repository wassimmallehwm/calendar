import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorContext } from 'src/contexts'
import { Account, EmptyAccount } from '@modules/settings/models/Account'
import { Role } from '@modules/settings/models/Role'
import accountsService from '@modules/settings/services/accounts.service'
import rolesService from '@modules/settings/services/roles.service'
import { Button, Loader } from '@shared/components'
import { Select } from '@shared/components/form'
import { httpErrorHandler, showLoading, showToast } from 'src/utils'

const AccountsForm = () => {
    const { setError } = useContext(ErrorContext)
    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>(EmptyAccount);
    const [roles, setRoles] = useState<Role[]>();
    const { firstname, lastname, legalname, email, role } = account;

    useEffect(() => {
        if (params.id) {
            getAccount(params.id)
        }
        getRoles()
    }, [params])

    const getAccount = (id: string) => {
        setLoading(true)
        accountsService.findOne(id).then(
            (res: any) => {
                setAccount(res.data)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            setError({ status, message, tryAgain: () => getAccount(params.id!) })
        }).finally(() => {
            setLoading(false)
        })
    }
    const getRoles = () => {
        rolesService.findAll().then(
            (res: any) => {
                setRoles(res.data)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            console.error(message)
        })
    }

    const onSuccess = () => {
        showToast('success', "Operation success")
        navigate('/settings/accounts')
    }

    const saveAccount = async () => {
        setLoading(true)
        showLoading()
        try {
            if (account._id) {
                await accountsService.update(account._id, account)
                onSuccess()
            } else {
                await accountsService.create(account)
                onSuccess()
            }
        } catch (error) {
            const { message } = httpErrorHandler(error);
            showToast('error', message)
        } finally {
            setLoading(false)
        }
    }

    const onChange = (e: any) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }

    const disabledRole = (label: string) => {
        return (account.type == "PERSON" && label == "AGENCY") ||
        account.type == "CORP" && label == "USER"
    }

    return loading ? <Loader /> :
        (
            <div className="main-div">
                <form action="" className="space-y-6 mx-auto w-full md:w-1/2 ">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Account type
                        </label>
                        <Select name="type" value={account.type} onChange={onChange}>
                            <option disabled selected value=''>Select account type</option>
                            <option value="PERSON">Person</option>
                            <option value="CORP">Agency</option>
                        </Select>
                    </div>
                    {
                        account.type == "PERSON" && (
                            <>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block">
                                        Firstname
                                    </label>
                                    <input type="text" name="firstname" value={firstname} onChange={onChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block">
                                        Lastname
                                    </label>
                                    <input type="text" name="lastname" value={lastname} onChange={onChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                                </div></>
                        )
                    }
                    {
                        account.type == "CORP" && (
                            <div>
                                <label className="text-sm font-bold text-gray-600 block">
                                    Legal name
                                </label>
                                <input type="text" name="legalname" value={legalname} onChange={onChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1" />
                            </div>
                        )
                    }
                    {
                        account.type && account.type !== "" && (
                            <>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block">
                                        Email
                                    </label>
                                    <input type="email" name="email" value={email} onChange={onChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block">
                                        Roles
                                    </label>
                                    <Select name="role" value={role?._id} onChange={onChange}>
                                        <option disabled selected value=''>Select role</option>
                                        {
                                            roles && roles.map((role: any) => (
                                                <option disabled={disabledRole(role.label)} key={role._id} value={role._id}>{role.label}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </>
                        )
                    }

                    <div>
                        <Button color='primary' onClick={saveAccount}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        )
}

export default AccountsForm