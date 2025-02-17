import React, { Fragment, useState } from 'react';
import { companyCreateDto } from './company.dto.interface';
import { Str } from '../../utils/Str';
import { lang } from '../../utils/lang';
import SpkButton from '@/@spk/uielements/spk-button';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import { FaSave } from "react-icons/fa";
import AxiosService from '../../services/AxiosService';
import CookieUtils from '../../utils/CookieUtils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Pageheader from '@/components/common/page-header/pageheader';
import { Utils } from '@/utils/Utils';

const ApiRequest = new AxiosService({
  baseURL: import.meta.env.VITE_BASE_API,
  token: Utils.getToken() ?? '',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default function CompanyCreate(): React.ReactElement {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<companyCreateDto>({
    username: '',
    email: '',
    password: '',
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

  const hndelSetFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const validatePasswordMatching = (password: string, passwordConfirm: string) => {
    if (!password || !passwordConfirm) {
      return { valid: false, message: "Both password fields are required." };
    }

    if (password !== passwordConfirm) {
      return { valid: false, message: "Passwords do not match." };
    }

    return { valid: true, message: "Passwords match." };
  };


  const hndelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = validatePasswordMatching(formData.password, passwordConfirm);

    if (!validationResult.valid) {
      toast.error(validationResult.message, {
        position: 'top-right',
      });
      return;
    }

    setLoading(true);
    const xFormData: any = new FormData();
    xFormData.append('username', formData.username);
    xFormData.append('email', formData.email);
    xFormData.append('password', formData.password);
    xFormData.append('company_name', formData.name);
    xFormData.append('address1', formData.address1);
    xFormData.append('address2', formData.address2);
    xFormData.append('address3', formData.address3);
    xFormData.append('zipcode', formData.zipcode);
    xFormData.append('telephone1', formData.telephone1);
    xFormData.append('telephone2', formData.telephone2);
    xFormData.append('fax', formData.fax);
    xFormData.append('website', formData.website);
    xFormData.append('avatar', formData.avatar);
    xFormData.append('cover', formData.cover);
    try {
      const saveData: any = await ApiRequest.post('/auth/add-new-company', xFormData);
      const { message } = saveData.data;
      toast.success(message, {
        position: 'top-right',
      })
      navigate('/company');
    } catch (error: any) {
      const { data } = error;
      setLoading(false);
      if (data.errorCode == "VALIDATION_ERROR") {
        data.data.forEach((err: any) => {
          toast.error(err.message, {
            position: 'top-right',
          })
        });
        return;
      }
      toast.error(data?.message ?? 'An error occurred', {
        position: 'top-right',
      })
    }
  }

  const hndelAvatarPush = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      avatar: file,
    });
  }
  const hndelCoverPush = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      cover: file,
    });
  }

  return (
    <Fragment>
      <Pageheader
        currentpage='Company'
        activepage='Company'
        activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
        mainpage='Create'
      />

      <div className='grid grid-cols-12 gap-x-6'>
        <div className='xl:col-span-12 col-span-12'>
          <form onSubmit={hndelSubmit}>
            <div className='box'>
              <div className='box-header justify-between'>
                <div className='box-title'>{Str.cap(lang.company?.create ?? '')}</div>
              </div>
              <div className="box-body">
                <div className="grid grid-cols-12 sm:gap-6 mb-4">
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">
                      {Str.cap(lang.username ?? 'username')}
                      <span className="ml-1 text-danger">*</span>
                    </label>
                    <input type="text"
                      name="username"
                      onChange={hndelSetFormData}
                      required
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">
                      {Str.cap(lang.email ?? 'email')}
                      <span className="ml-1 text-danger">*</span>
                    </label>
                    <input type="email"
                      name="email"
                      onChange={hndelSetFormData}
                      required
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">
                      {Str.cap(lang.password ?? 'password')}
                      <span className="ml-1 text-danger">*</span>
                    </label>
                    <div className='input-group'>
                      <input
                        type={passwordShow ? 'text' : 'password'}
                        name='password'
                        onChange={hndelSetFormData}
                        className={`form-control form-control-lg !border-s !rounded-e-none `}
                        id='signin-password'
                        placeholder='Password'
                      />

                      <SpkButton
                        Label='button'
                        buttontype='button'
                        variant='light'
                        customClass='ti-btn !rounded-s-none !mb-0'
                        onclickfunc={() => setPasswordShow(!passwordShow)}
                        Id='button-addon2'>
                        <i
                          className={`${passwordShow ? 'ri-eye-line' : 'ri-eye-off-line'
                            } align-middle`}></i>
                      </SpkButton>
                    </div>
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">
                      {Str.cap(lang.password_confirm ?? 'password confirm')}
                      <span className="ml-1 text-danger">*</span>
                    </label>
                    <div className='input-group'>
                      <input
                        type={passwordConfirmShow ? 'text' : 'password'}
                        name='password_confirm'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className={`form-control form-control-lg !border-s !rounded-e-none `}
                        id='password_confirm'
                        placeholder='Password Confirm'
                      />

                      <SpkButton
                        Label='button'
                        buttontype='button'
                        variant='light'
                        customClass='ti-btn !rounded-s-none !mb-0'
                        onclickfunc={() => setPasswordConfirmShow(!passwordConfirmShow)}
                        Id='button-addon2'>
                        <i
                          className={`${passwordConfirmShow ? 'ri-eye-line' : 'ri-eye-off-line'
                            } align-middle`}></i>
                      </SpkButton>
                    </div>
                  </div>
                </div>
              </div>


              <div className="box-body">
                <div className="grid grid-cols-12 sm:gap-6 mb-4">
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">
                      {Str.cap(lang.company.company_name ?? 'name')}
                      <span className="ml-1 text-danger">*</span>
                    </label>
                    <input type="text"
                      name="name"
                      onChange={hndelSetFormData}
                      required
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.address ?? 'address')} 1</label>
                    <input type="text"
                      name="address1"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.address ?? 'address')} 2</label>
                    <input type="text"
                      name="address2"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.address ?? 'address')} 3</label>
                    <input type="text"
                      name="address3"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.zip_code ?? 'zip code')}</label>
                    <input type="text"
                      name="zipcode"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.telephone ?? 'telephone')} 1</label>
                    <input type="text"
                      name="telephone1"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.telephone ?? 'telephone')} 2</label>
                    <input type="text"
                      name="telephone2"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.fax ?? 'fax')}</label>
                    <input type="text"
                      name="fax"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.website ?? 'website')}</label>
                    <input type="text"
                      name="website"
                      onChange={hndelSetFormData}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" placeholder="Enter job title" />
                  </div>

                  {/* avatar */}
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.avatar ?? 'avatar')}</label>
                    <input type="file"
                      name="avatar"
                      onChange={hndelAvatarPush}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" />
                  </div>
                  {/* cover */}
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="form-label">{Str.cap(lang.cover ?? 'cover')}</label>
                    <input type="file"
                      name="cover"
                      onChange={hndelCoverPush}
                      className="form-control focus:!border-primary border focus:!ring-0 focus:!ring-offset-0 disabled:opacity-50 disabled:pointer-events-none" id="job-title" />
                  </div>

                </div>
              </div>
              <div className='box-footer text-end'>

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
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
