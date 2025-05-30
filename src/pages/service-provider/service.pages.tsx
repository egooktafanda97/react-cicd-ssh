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
import { Link, useNavigate } from 'react-router-dom';
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
import ModalBasic from '@/Isomorphic/molecules/modal/ModalBasic';

const apiRequest = new AxiosService({
  baseURL: import.meta.env.VITE_BASE_API,
  token: Utils.getToken() ?? '',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default function ServicePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [keyInstance, setKeyInstance] = useState<string | null>(null);
  const [dataUpdate, setDataUpdate] = useState<any>({});

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
      const reads = await apiRequest.get(`/service-providers/${items.id}`);
      if (reads) {
        setDataUpdate(reads?.data);
        const modal = document.getElementById('btn-hs-vertically-centered-modal-update');
        if (modal) {
          modal.click();
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
      url: `${Utils.baseApiUrl()}/service-providers/${items.id}`,
      callback: () => {
        setKeyInstance(new Date().getTime().toString());
        toast.success('delete success', {
          position: 'top-right',
        })
      }
    });
  }

  return (
    <Fragment>
      <div className='h-100 w-full'></div>
      <button
        type="button"
        style={{
          display: 'none',
        }}
        id="btn-hs-vertically-centered-modal-update"
        data-hs-overlay="#hs-vertically-centered-modal-update"
      >
        <i className="ri-edit-line"></i>
      </button>
      <div className="main-content flex flex-col h-[calc(100vh-3.5rem)] w-full !p-0">
        <GridJS
          keyInstance={keyInstance}
          url={`${Utils.baseApiUrl()}/service-providers`}
          TopHeader={() => (<>
            <div className='box-title'>{Str.cap(lang.service["."] ?? '')}</div>
            <button type="button" className="ti-btn ti-btn-primary-full label-ti-btn" data-hs-overlay="#hs-vertically-centered-modal">
              <i className="ri-add-line label-ti-btn-icon  me-2"></i>
              {Str.cap(lang?.service?.add_new_service ?? '')}
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
              label: "Service Name",
              field: (row: any) => _(
                <div>
                  <img src={`${import.meta.env.VITE_BASE_API}/services/${row.logo}`} alt="" className="avatar avatar-sm me-2" />
                  {row.name}
                </div>
              )
            },
            {
              label: "domain",
              field: (Row: any) => _(
                <a href={Row.base_domain} target='_blank'>{Row.base_domain}</a>
              )
            },
            {
              label: "Description",
              field: (row: any) => row.description
            },
            {
              label: {
                name: "",
                width: "50px"
              },
              field: (row: any) => _(
                <div className='flex justify-center'>
                  <SpkButton onclickfunc={() => navigate(`/services/permission/${row.id}`)} Label="button" buttontype="button" variant="primary" Size="sm" customClass="ti-btn ti-btn-icon me-2">
                    <i className="ri-stack-line"></i>
                  </SpkButton>
                </div>
              )
            },
            {
              label: {
                name: "",
                width: "50px"
              },
              field: (row: any) => _(
                <div className='flex justify-end'>
                  <SpkButton onclickfunc={() => hndelUpdate(row)} Label="button" buttontype="button" variant="success" Size="sm" customClass="ti-btn ti-btn-icon me-2"><i className="ri-edit-line"></i></SpkButton>
                  <SpkButton onclickfunc={() => hndelDelete(row)} Label="button" variant="danger" buttontype="button" Size="sm" customClass="ti-btn ti-btn-icon ms-1 invoice-btn" ><i className="ri-delete-bin-5-line"></i></SpkButton>
                </div>
              )
            }
          ]}
          limit={15}
        />
      </div>
      <ServiceCreate
        donePost={() => {
          setKeyInstance(new Date().getTime().toString());
        }}
      />
      <ServiceUpdate
        initialData={dataUpdate ?? {}}
        donePost={() => {
          setKeyInstance(new Date().getTime().toString());
        }}
      />
    </Fragment >
  );
}
