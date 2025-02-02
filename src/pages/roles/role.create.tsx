import SpkButton from '@/@spk/uielements/spk-button';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import AxiosService from '@/services/AxiosService';
import { lang } from '@/utils/lang';
import { Str } from '@/utils/Str';
import { Utils } from '@/utils/Utils';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

type fromData = {
    name: string;
    description: string;
}

const apiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? ''
});

export default function ServiceCreate({ donePost }: any) {
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = useState<fromData>({
        name: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const push: any = await apiRequest.post('/roles', formData);
            setLoading(false);
            toast.success(push?.data?.message ?? "Success", {
                position: 'top-right',
            })
            const modalClose = document.getElementById('modalClose');
            if (donePost) donePost();
            modalClose?.click();
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message ?? "Failed", {
                position: 'top-right',
            })
        }
    };

    return (
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

                    <form onSubmit={handleSubmit} className="ti-modal-form">
                        <div className="ti-modal-body w-full">
                            <div className="box-body w-full">
                                <div className="grid grid-cols-12 sm:gap-12 mb-4">
                                    <div className="xl:col-span-12 col-span-12">
                                        <label htmlFor="job-title" className="form-label">
                                            {Str.cap(lang.service.service_name ?? 'name')}
                                            <span className="ml-1 text-danger">*</span>
                                        </label>
                                        <input type="text"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                            className="form-control w-full focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Service Name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 sm:gap-12 mb-4">
                                    <div className="xl:col-span-12 col-span-12">
                                        <label htmlFor="job-title" className="form-label">
                                            {Str.cap(lang.service.description ?? 'description')}
                                            <span className="ml-1 text-danger">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            onChange={handleChange}
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
    );
}
