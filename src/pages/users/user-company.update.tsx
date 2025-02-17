import React, { Fragment, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import SpkButton from '@/@spk/uielements/spk-button';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import Pageheader from '@/components/common/page-header/pageheader';
import { lang } from '@/utils/lang';
import { Str } from '@/utils/Str';
import toast from 'react-hot-toast';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';
import { useNavigate, useParams } from 'react-router-dom';


interface FormData {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    avatar?: File;
    cover?: File;
}
const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
});

export default function UserCompanyUpdate() {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormData>({});
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response: any = await ApiRequest.get(`/users/${id}`);
                response.data.name = response.data.name ?? response.data.displayname ?? '';
                setFormData(response.data);
            } catch (error) {
                toast.error("Failed to fetch user data", { position: 'top-right' });
            }
        };
        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formDataSubmit = new FormData();
        formDataSubmit.append('name', formData.name ?? '');
        formDataSubmit.append('username', formData.username ?? '');
        formDataSubmit.append('email', formData.email ?? '');
        if (formData.password) {
            formDataSubmit.append('password', formData.password);
        }
        if (formData.avatar) {
            formDataSubmit.append('avatar', formData.avatar);
        }
        if (formData.cover) {
            formDataSubmit.append('cover', formData.cover);
        }

        try {
            const push: any = await ApiRequest.put(`/users/${id}`, formDataSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            toast.success(push?.message ?? "User updated successfully", { position: 'top-right' });
            navigate("/users");
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message ?? "Update failed", { position: 'top-right' });
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: keyof FormData) => {
        const file = e.target.files?.[0];
        setFormData({ ...formData, [key]: file });
    };

    return (
        <Fragment>
            <Pageheader currentpage='Users' activepage='Users' activepage_link={`${import.meta.env.VITE_META_BASE_PATH}users`} mainpage='Update' />
            <div className='grid grid-cols-12 gap-x-6'>
                <div className='col-span-12'>
                    <form onSubmit={handleSubmit} className='box'>
                        <div className='box-header justify-between'>
                            <div className='box-title'>{Str.cap('User Update')}</div>
                        </div>
                        <div className='box-body grid grid-cols-12 gap-6 mb-4'>
                            <InputField
                                value={formData.name}

                                label={lang.name ?? 'name'} name='name' type='text' onChange={handleInputChange} required />
                            <InputField
                                value={formData.username}
                                label={lang.username ?? 'username'} name='username' type='text' onChange={handleInputChange} required />
                            <InputField
                                value={formData.email}
                                label={lang.email ?? 'email'} name='email' type='email' onChange={handleInputChange} required />
                            <PasswordField label={lang.password ?? 'password'} name='password' show={passwordShow} setShow={setPasswordShow} onChange={handleInputChange} />
                            <FileInputField label={lang.avatar ?? 'avatar'} name='avatar' onChange={(e) => handleFileChange(e, 'avatar')} />
                            <FileInputField label={lang.cover ?? 'cover'} name='cover' onChange={(e) => handleFileChange(e, 'cover')} />
                        </div>
                        <div className='box-footer text-end'>
                            <SpkButton buttontype='submit' variant='primary-full' disabled={loading} customClass={loading ? 'ti-btn-disabled ti-btn me-2' : 'ti-btn me-2 active:scale-95 transition-transform duration-200'}>
                                {loading ? (
                                    <>
                                        <SpkSpinner Label='loading' customClass='text-white' />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <span className='w-[100px] flex items-center justify-center'>
                                        <FaSave className='mr-2' />
                                        {Str.cap(lang.save ?? 'save')}
                                    </span>
                                )}
                            </SpkButton>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}


interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value: any;
}

function InputField({ label, name, type, onChange, required, value }: InputFieldProps) {
    return (
        <div className='xl:col-span-6 col-span-12'>
            <label htmlFor={name} className='form-label'>{Str.cap(label)}<span className='ml-1 text-danger'>*</span></label>
            <input
                type={type}
                name={name}
                value={value} // Gunakan state sebagai nilai default
                onChange={onChange}
                required={required}
                className='form-control focus:border-primary border focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none'
                id={name}
            />
        </div>
    );
}


interface PasswordFieldProps {
    label: string;
    name: string;
    show: boolean;
    setShow: (show: boolean) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({ label, name, show, setShow, onChange }: PasswordFieldProps) {
    return (
        <div className='xl:col-span-6 col-span-12'>
            <label htmlFor={name} className='form-label'>{Str.cap(label)}<span className='ml-1 text-danger'>*</span></label>
            <div className='input-group'>
                <input type={show ? 'text' : 'password'} name={name} onChange={onChange} className='form-control form-control-lg border-s rounded-e-none' id={name} />
                <SpkButton Label='button' buttontype='button' variant='light' customClass='ti-btn rounded-s-none mb-0' onclickfunc={() => setShow(!show)}>
                    <i className={`${show ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`} />
                </SpkButton>
            </div>
        </div>
    );
}

interface FileInputFieldProps {
    label: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileInputField({ label, name, onChange }: FileInputFieldProps) {
    return (
        <div className='xl:col-span-6 col-span-12'>
            <label htmlFor={name} className='form-label'>{Str.cap(label)}</label>
            <input type='file' name={name} onChange={onChange} className='form-control focus:border-primary border focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none' id={name} />
        </div>
    );
}
