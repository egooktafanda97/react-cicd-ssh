import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GridJS from '@/Isomorphic/molecules/tables/GridJs';
import SpkButton from '@/@spk/uielements/spk-button';
import { Str } from '@/utils/Str';
import { lang } from '@/utils/lang';
import { Link } from 'react-router-dom';
import { Utils } from '@/utils/Utils';
import { deleteFunction } from '@/utils/ComponentHelper';
import toast from 'react-hot-toast';
import { _ } from 'gridjs-react';

export default function UserCompanyPage() {
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

    const handleUpdate = (items: any) => {
        navigate(`update/${items.id}`);
    };

    const handleDelete = (items: any) => {
        deleteFunction({
            url: `${Utils.baseApiUrl()}/users/${items.id}`,
            callback: () => {
                toast.success('User deleted successfully!', {
                    position: 'top-right',
                });
            }
        });
    };

    const handleRoles = (items: any) => {
        navigate(`/users/roles/${items.id}`);
    }

    return (
        <Fragment>
            <div className="h-100 w-full"></div>
            <div className="main-content flex flex-col h-[calc(100vh-3.5rem)] w-full !p-0">
                <GridJS
                    url={`${Utils.baseApiUrl()}/users/list`}
                    TopHeader={() => (
                        <>
                            <div className="box-title"></div>
                            <Link to={`create`} className="ti-btn ti-btn-primary-full label-ti-btn">
                                <i className="ri-add-line label-ti-btn-icon me-2"></i>
                                Add New User
                            </Link>
                        </>
                    )}
                    dataset={[
                        {
                            label: {
                                name: "No",
                                attributes: { "class": "text-center" },
                                width: "30px"
                            },
                            field: (row: any) => row.no
                        },
                        {
                            label: "Name",
                            field: (row: any) => _(
                                <button className="btn btn-link hover:text-primary focus:text-primary" onClick={() => navigate(`detail/${row.id}`)}>
                                    {row.displayname}
                                </button>
                            )
                        },
                        {
                            label: "Username",
                            field: (row: any) => row.username
                        },
                        {
                            label: "Email",
                            field: (row: any) => row.email
                        },
                        {
                            label: "Company",
                            field: (row: any) => row.company?.name ?? "-"
                        },
                        {
                            label: "#",
                            field: (row: any) => _(
                                <div>
                                    <SpkButton
                                        onclickfunc={() => handleRoles(row)}
                                        Label="button"
                                        buttontype="button"
                                        variant="secondary"
                                        Size="sm"
                                        title="Roles"
                                        customClass="ti-btn ti-btn-icon me-2"
                                    >
                                        <i className="ri-lock-2-line"></i>
                                    </SpkButton>
                                    <SpkButton
                                        onclickfunc={() => handleUpdate(row)}
                                        Label="button"
                                        buttontype="button"
                                        variant="primary"
                                        Size="sm"
                                        customClass="ti-btn ti-btn-icon me-2"
                                    >
                                        <i className="ri-edit-line"></i>
                                    </SpkButton>
                                    <SpkButton
                                        onclickfunc={() => handleDelete(row)}
                                        Label="button"
                                        variant="danger"
                                        buttontype="button"
                                        Size="sm"
                                        customClass="ti-btn ti-btn-icon ms-1 invoice-btn"
                                    >
                                        <i className="ri-delete-bin-5-line"></i>
                                    </SpkButton>
                                </div>
                            )
                        }
                    ]}
                    limit={15}
                />
            </div>
        </Fragment>
    );
}
