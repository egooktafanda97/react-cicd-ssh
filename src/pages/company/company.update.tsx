import React, { Fragment, useState, useEffect } from 'react';
import { companyUpdateDto } from './company.dto.interface';
import { Str } from '../../utils/Str';
import { lang } from '../../utils/lang';
import SpkButton from '@/@spk/uielements/spk-button';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import { FaSave } from "react-icons/fa";
import AxiosService from '../../services/AxiosService';
import CookieUtils from '../../utils/CookieUtils';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Pageheader from '@/components/common/page-header/pageheader';
import { Utils } from '@/utils/Utils';

const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',

});

export default function CompanyUpdate(): React.ReactElement {
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<companyUpdateDto>({
        name: '',
        address1: '',
        address2: '',
        address3: '',
        zipcode: '',
        telephone1: '',
        telephone2: '',
        fax: '',
        website: '',
        avatar: '',
        cover: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: any = await ApiRequest.get(`/company/${id}`);
                const { data } = response;

                setFormData({
                    name: data.name,
                    address1: data.address1,
                    address2: data.address2,
                    address3: data.address3,
                    zipcode: data.zipcode,
                    telephone1: data.telephone1,
                    telephone2: data.telephone2,
                    fax: data.fax,
                    website: data.website,
                    avatar: '',
                    cover: '',
                });
                setLoading(false);
            } catch (error: any) {
                toast.error(error?.message || 'Failed to fetch company data', {
                    position: 'top-right',
                });
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const hndelSetFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const hndelAvatarPush = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData({
            ...formData,
            avatar: file,
        });
    };

    const hndelCoverPush = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData({
            ...formData,
            cover: file,
        });
    };

    const validatePasswordMatching = (password: string, passwordConfirm: string) => {
        if (password && password !== passwordConfirm) {
            return { valid: false, message: "Passwords do not match." };
        }
        return { valid: true, message: "Passwords match." };
    };

    const hndelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            company_name: formData.name,
            address1: formData.address1,
            address2: formData.address2,
            address3: formData.address3,
            zipcode: formData.zipcode,
            telephone1: formData.telephone1,
            telephone2: formData.telephone2,
            fax: formData.fax,
            website: formData.website,
        };
        try {
            const saveData: any = await ApiRequest.put(`/company/${id}`, payload);
            const { message } = saveData.data;
            toast.success(message, {
                position: 'top-right',
            });
            navigate('/company');
        } catch (error: any) {
            const { data } = error;
            toast.error(data?.message || 'An error occurred', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Pageheader
                currentpage='Company'
                activepage='Update Company'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
                mainpage='Update'
            />

            <div className='grid grid-cols-12 gap-x-6'>
                <div className='xl:col-span-12 col-span-12'>
                    <form onSubmit={hndelSubmit}>
                        <div className='box'>
                            <div className='box-header justify-between'>
                                <div className='box-title'>{Str.cap(lang.company?.update ?? '')}</div>
                            </div>
                            <div className="box-body">
                                <div className="grid grid-cols-12 sm:gap-6 mb-4">
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="name" className="form-label">
                                            {Str.cap(lang.company.company_name ?? 'name')}
                                            <span className="ml-1 text-danger">*</span>
                                        </label>
                                        <input type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={hndelSetFormData}
                                            required
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="name"
                                            placeholder="Enter company name" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="address1" className="form-label">
                                            {Str.cap(lang.address ?? 'address')} 1
                                        </label>
                                        <input type="text"
                                            name="address1"
                                            value={formData?.address1 ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="address1"
                                            placeholder="Enter address 1" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="address2" className="form-label">
                                            {Str.cap(lang.address ?? 'address')} 2
                                        </label>
                                        <input type="text"
                                            name="address2"
                                            value={formData?.address2 ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="address2"
                                            placeholder="Enter address 2" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="address3" className="form-label">
                                            {Str.cap(lang.address ?? 'address')} 3
                                        </label>
                                        <input type="text"
                                            name="address3"
                                            value={formData?.address3 ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="address3"
                                            placeholder="Enter address 3" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="zipcode" className="form-label">
                                            {Str.cap(lang.zip_code ?? 'zip code')}
                                        </label>
                                        <input type="text"
                                            name="zipcode"
                                            value={formData?.zipcode ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="zipcode"
                                            placeholder="Enter zip code" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="telephone1" className="form-label">
                                            {Str.cap(lang.telephone ?? 'telephone')} 1
                                        </label>
                                        <input type="text"
                                            name="telephone1"
                                            value={formData?.telephone1 ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="telephone1"
                                            placeholder="Enter telephone 1" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="telephone2" className="form-label">
                                            {Str.cap(lang.telephone ?? 'telephone')} 2
                                        </label>
                                        <input type="text"
                                            name="telephone2"
                                            value={formData?.telephone2 ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="telephone2"
                                            placeholder="Enter telephone 2" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="fax" className="form-label">
                                            {Str.cap(lang.fax ?? 'fax')}
                                        </label>
                                        <input type="text"
                                            name="fax"
                                            value={formData?.fax ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="fax"
                                            placeholder="Enter fax" />
                                    </div>

                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="website" className="form-label">
                                            {Str.cap(lang.website ?? 'website')}
                                        </label>
                                        <input type="text"
                                            name="website"
                                            value={formData?.website ?? ""}
                                            onChange={hndelSetFormData}
                                            className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                            id="website"
                                            placeholder="Enter website" />
                                    </div>
                                </div>
                            </div>

                            <div className='box-footer text-end'>
                                <SpkButton buttontype="submit" variant="primary-full" disabled={loading ? 'disabled' : ''}
                                    customClass={loading ? 'ti-btn-disabled ti-btn me-2' : 'ti-btn me-2 active:scale-95 active:bg-blue-800 transition-transform duration-200'}>
                                    {loading ? (<>
                                        <SpkSpinner Label="loading" customClass="text-white"></SpkSpinner>
                                        <span>Loading...</span>
                                    </>) : <span className='w-[100px] flex items-center justify-center'>
                                        <FaSave className='mr-2' />
                                        {Str.cap(lang.save ?? 'save')}
                                    </span>}
                                </SpkButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
