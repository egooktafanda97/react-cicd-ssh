import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import { ChangeContainerWrapper, ThemeChanger } from '../../redux/action';
import store from '../../redux/store';
import { useDispatch } from 'react-redux';

import Header from '@/components/common/header/header';
import Sidebar from '@/components/common/sidebar/sidebar';
import GridJS from '@/Isomorphic/molecules/tables/GridJs';
import SpkButton from '@/@spk/uielements/spk-button';
import { Str } from '@/utils/Str';
import { lang } from '@/utils/lang';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SpkDropdown from '@/@spk/uielements/spk-dropdown';
import { Utils } from '@/utils/Utils';
import { encrypt } from '@/utils/Crypt';
import SpkAlert from '@/@spk/uielements/spk-alert';
import Swal from 'sweetalert2'
import { deleteFunction } from '@/utils/ComponentHelper';
import toast from 'react-hot-toast';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import { FaSave } from 'react-icons/fa';
import ServiceCreate from './service.create';
import { _ } from 'gridjs-react';
import ServiceUpdate from './service.update';
import AxiosService from '@/services/AxiosService';

const apiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default function ServicePermissions({ }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [serviceData, setServiceData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [keyInstance, setKeyInstance] = useState<string | null>(null);
    const [dataUpdate, setDataUpdate] = useState<any>({});
    const [formData, setFormData] = useState<{ name: string | ""; description: string | ""; }>({
        name: '',
        description: ''
    });
    const [dataId, setDataId] = useState<number | null>(null);
    const hndelChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const readService = () => {
        try {
            apiRequest.get(`/service-providers/${id}`)
                .then((response) => {
                    setServiceData(response?.data);
                })
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Failed", {
                position: 'top-right',
            })
        }
    }

    useEffect(() => {
        const mainContent: any = document.querySelector('.main-content');
        const footer: any = document.querySelector('.footer');
        if (mainContent) {
            mainContent.style.padding = `0`;
            mainContent.classList.add('bg-white');
            mainContent.classList.add('dark:bg-bodybg2');
        }
        if (footer) {
            footer.style.display = `none`;
        }
        readService();
        // Cleanup listener saat komponen unmount
        return () => {
            if (mainContent) {
                mainContent.style.padding = `0 1rem`;
                mainContent.classList.remove('bg-white');
                mainContent.classList.remove('dark:bg-bodybg2');
            }
            if (footer) {
                footer.style.display = `block`;
            }
        };
    }, []);

    const hndelUpdate = async (items: any) => {
        try {
            const reads: any = await apiRequest.get(`/permissions/${items.id}`);
            if (reads.status === 200) {
                setFormData(reads?.data);
                setDataId(items.id);
                const modalClose = document.getElementById('modalClose');
                if (modalClose) {
                    modalClose.click();
                }
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Failed", {
                position: 'top-right',
            })
        }

    }

    const hndelDelete = (items: any) => {
        deleteFunction({
            url: `${Utils.baseApiUrl()}/permissions/${items.id}`,
            callback: () => {
                setKeyInstance(new Date().getTime().toString());
                toast.success('delete success', {
                    position: 'top-right',
                })
            }
        });
    }

    const hndelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!serviceData?.reference_code)
                toast.error('Service Provider not found', {
                    position: 'top-right',
                })
            let push: any = null;
            if (!dataId)
                push = await apiRequest.post(`/permissions/${serviceData?.reference_code ?? ''}/service`, formData);
            else
                push = await apiRequest.put(`/permissions/${dataId}`, formData);
            setLoading(false);
            toast.success(push?.data?.message ?? "Success", {
                position: 'top-right',
            })
            const modalClose = document.getElementById('modalClose');
            if (modalClose) {
                modalClose.click();
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message ?? "Failed", {
                position: 'top-right',
            })
        }
    }
    return (
        <Fragment>
            <div className='h-100 w-full'></div>

            <div className="main-content flex flex-col h-[calc(100vh-3.5rem)] w-full !p-0">
                {serviceData && serviceData.reference_code && <GridJS
                    keyInstance={keyInstance}
                    url={`${Utils.baseApiUrl()}/permissions/${serviceData?.reference_code ?? ''}/service`}
                    TopHeader={() => (<>
                        <div className='box-title'>
                            <div className='flex items-center'>
                                <Link className='text-primary mr-2' to='/services'>
                                    <i className="ri-arrow-left-line text-xl"></i>
                                </Link>
                                <div className='mb-1'>
                                    <span
                                        className="badge bg-outline-secondary !font-semibold !text-[.9375rem] inline-flex items-center">
                                        <i className="ti ti-flame me-1"></i>
                                        {serviceData?.name ?? 'Service Provider'}
                                    </span>
                                </div>
                            </div>
                            <span className='text-gray-600'>Route Permission Services</span>
                        </div>
                        <button type="button" className="ti-btn ti-btn-primary-full label-ti-btn"
                            onClick={() => {
                                const modalClose = document.getElementById('modalClose');
                                if (modalClose) {
                                    setFormData({
                                        name: '',
                                        description: ''
                                    });
                                    modalClose.click();
                                }
                            }}>
                            <i className="ri-add-line label-ti-btn-icon  me-2"></i>
                            Add Permission
                        </button>
                    </>)}
                    dataset={[
                        {
                            label: {
                                name: "No",
                                width: "50px"
                            },
                            field: (row: any) => row?.no ?? 1
                        },
                        {
                            label: "Permission Name",
                            field: (row: any) => row.name
                        },
                        {
                            label: "Description",
                            field: (row: any) => row.description
                        },
                        {
                            label: {
                                name: "",
                                width: "100px"
                            },
                            field: (row: any) => _(
                                <div className='flex justify-end'>
                                    <SpkButton onclickfunc={() => hndelUpdate(row)} Label="button" buttontype="button" variant="success" Size="sm" customClass="ti-btn ti-btn-icon me-2"><i className="ri-edit-line"></i></SpkButton>
                                    <SpkButton onclickfunc={() => hndelDelete(row)} Label="button" variant="danger" buttontype="button" Size="sm" customClass="ti-btn ti-btn-icon ms-1 invoice-btn" ><i className="ri-delete-bin-5-line"></i></SpkButton>
                                </div>
                            )
                        }
                    ]}
                    limit={10}
                />}

                <div id="hs-vertically-centered-modal" className="hs-overlay hidden ti-modal">
                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
                        <div className="ti-modal-content">
                            <div className="ti-modal-header">
                                <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel2">
                                    Service Provider Form
                                </h6>
                                <button type="button" id='modalClose' className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-vertically-centered-modal">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={hndelSubmit} className="ti-modal-form">
                                <div className="ti-modal-body w-full">
                                    <div className="box-body w-full">
                                        <div className="grid grid-cols-12 sm:gap-12 mb-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="job-title" className="form-label">
                                                    {Str.cap('Permission Name')}
                                                    <span className="ml-1 text-danger">*</span>
                                                </label>
                                                <input type="text"
                                                    name="name"
                                                    required
                                                    onChange={hndelChange}
                                                    value={formData.name}
                                                    className="form-control w-full focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Service Name" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 sm:gap-12 mb-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="job-title" className="form-label">
                                                    {Str.cap('Description')}
                                                    <span className="ml-1 text-danger">*</span>
                                                </label>
                                                <textarea
                                                    name="description"
                                                    onChange={hndelChange}
                                                    value={formData.description}
                                                    className="form-control w-full focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="service descriptions" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ti-modal-footer">
                                    <SpkButton buttontype="submit" variant="primary-full" disabled={loading ? 'disabled' : ''} customClass={loading ? 'ti-btn-disabled ti-btn me-2' : 'ti-btn me-2 active:scale-95 active:bg-blue-800 transition-transform duration-200'}
                                    >
                                        {loading ? (<>
                                            <SpkSpinner Label="loading" customClass="text-white"></SpkSpinner>
                                            <span>Loading...</span>
                                        </>) : <span className='w-[100px] flex items-center justify-center'>
                                            <FaSave className='mr-2' />
                                            {Str.cap(lang.save ?? 'save')}
                                        </span>}
                                    </SpkButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
}
