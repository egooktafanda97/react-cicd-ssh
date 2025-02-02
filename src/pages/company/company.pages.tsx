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
import { companyDto } from './company.dto.interface';
import { encrypt } from '@/utils/Crypt';
import SpkAlert from '@/@spk/uielements/spk-alert';
import Swal from 'sweetalert2'
import { deleteFunction } from '@/utils/ComponentHelper';
import toast from 'react-hot-toast';
import { _ } from 'gridjs-react';
import SpkBadge from '@/@spk/uielements/spk-badge';






export default function companyPage() {
  const navigate = useNavigate();
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

  const hndelUpdate = (items: any) => {
    navigate(`update/${items.id}`);
  }

  const hndelDelete = (items: any) => {
    deleteFunction({
      url: `${Utils.baseApiUrl()}/company/${items.id}`,
      callback: () => {
        toast.success('delete success', {
          position: 'top-right',
        })
      }
    });
  }
  return (
    <Fragment>
      <div className='h-100 w-full'></div>
      <div className="main-content flex flex-col h-[calc(100vh-3.5rem)] w-full !p-0">
        <GridJS
          url={`${Utils.baseApiUrl()}/company`}
          TopHeader={() => (<>
            <div className='box-title'>{Str.cap(lang.company["."] ?? '')}</div>
            <Link to={`create`} className="ti-btn ti-btn-primary-full label-ti-btn">
              <i className="ri-add-line label-ti-btn-icon  me-2"></i>
              Add New Company
            </Link>
          </>)}
          dataset={
            [
              {
                label: {
                  name: "No",
                  attributes: {
                    "class": "text-center"
                  },
                  width: "30px"
                },
                field: (row: any) => row.no
              },
              {
                label: "Company Name",
                field: (row: companyDto) => _(
                  <button className="btn btn-link hover:text-primary focus:text-primary" onClick={() => navigate(`detail/${row.id}`)}>
                    {row.name}
                  </button>
                )
              },
              {
                label: "Email",
                field: (row: companyDto) => row.users?.email ?? ""
              },
              {
                label: "Username",
                field: (row: companyDto) => row?.users?.username ?? ""
              },
              {
                label: "Address",
                field: (row: companyDto) => row.address1
              },
              {
                label: "Telephone",
                field: (row: companyDto) => row.telephone1
              },
              {
                label: "Fax",
                field: (row: companyDto) => row.fax
              },
              {
                label: "Website",
                field: (row: companyDto) => row.website
              },
              {
                label: "#",
                field: (row: companyDto) => _(
                  <div>
                    <SpkButton onclickfunc={() => hndelUpdate(row)} Label="button" buttontype="button" variant="primary" Size="sm" customClass="ti-btn ti-btn-icon me-2"><i className="ri-edit-line"></i></SpkButton>
                    <SpkButton onclickfunc={() => hndelDelete(row)} Label="button" variant="danger" buttontype="button" Size="sm" customClass="ti-btn ti-btn-icon ms-1 invoice-btn" ><i className="ri-delete-bin-5-line"></i></SpkButton>
                  </div>
                )
              }
            ]
          }
          limit={15}
        />
      </div>
    </Fragment >
  );
}
