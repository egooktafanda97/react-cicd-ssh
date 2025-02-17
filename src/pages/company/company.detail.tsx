import SpkButton from '@/@spk/uielements/spk-button';
import Pageheader from '@/components/common/page-header/pageheader';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { extend } from 'leaflet';
import { companyDto } from './company.dto.interface';
import logo from '@/assets/images/logo/e-SAPA 400x128.png';
import Spktables from '@/@spk/tables/spk-tables';
import SpkBadge from '@/@spk/uielements/spk-badge';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';
import SpkSpinner from '@/@spk/uielements/spk-spinner';
import toast from 'react-hot-toast';
type ServiceItem = {
    id: string;
    name: string;
    isInstalled: boolean;
};

type Props = {
    serviceData: ServiceItem[];
};
interface CompanyDetailIterface extends companyDto { }
const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


export default function CompanyDetail() {
    const { id } = useParams();
    const [companyData, setCompanyData] = React.useState<CompanyDetailIterface>();
    const [serviceData, setServiceData] = React.useState<any[]>([]);
    const [loadingState, setLoadingState] = useState<{ [key: string]: "installing" | "uninstalling" | undefined }>({});

    const getCompanyById = async () => {
        try {
            const response: any = await ApiRequest.get(`/company/${id}`);
            setCompanyData(response?.data);
        } catch (error: any) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCompanyById();
        getAllService();
    }, []);

    const getAllService = async () => {
        try {
            const response: any = await ApiRequest.get(`/company-service-providers/company-instaled/${id}`);
            if (response?.data) {
                setServiceData(response?.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleAction = async (id: string, action: "installing" | "uninstalling") => {
        setLoadingState((prev) => ({ ...prev, [id]: action }));

        try {
            await ApiRequest.post("/company-service-providers/install", {
                company_id: companyData?.id,
                service_provider_id: id,
            });
            // if (action === "installing") {
            //     await ApiRequest.post("/company-service-providers", {
            //         company_id: companyData?.id,
            //         service_provider_id: id,
            //     });
            // } else if (action === "uninstalling") {
            //     await ApiRequest.delete(`/company-service-providers/${id}/with-service`);
            // }

            const serviceIndex = serviceData.findIndex((item) => item.id === id);
            if (serviceIndex !== -1) {
                serviceData[serviceIndex].isInstalled = action === "installing";
            }
            toast.success('success installing', {
                position: 'top-right',
            })

        } catch (error: any) {
            toast.error(error?.message ?? 'oops error!', {
                position: 'top-right',
            });
            console.error(`Failed to ${action === "installing" ? "add" : "remove"} service:`, error);
        } finally {
            // await getAllService();
            setLoadingState((prev) => {
                const updatedState = { ...prev };
                delete updatedState[id];
                return updatedState;
            });
        }
    };


    return (
        <Fragment>
            <Pageheader
                currentpage=''
                activepage='Company'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
                mainpage='Create'
            />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="sm:flex items-start p-6 main-profile-cover">
                                <div>
                                    <span className="avatar avatar-xxl avatar-rounded online me-4">
                                        <img src={`${import.meta.env.VITE_BASE_API}/users/${companyData?.users?.avatar ?? ""}`} />
                                    </span>
                                </div>
                                <div className="flex-grow main-profile-info">
                                    <div className="flex items-center !justify-between">
                                        <h6 className="font-semibold mb-1 text-white text-[1rem]">
                                            {companyData?.name ?? 'Company Name'}
                                        </h6>
                                    </div>
                                    <p className="mb-1 !text-white  opacity-[0.7]">
                                        {companyData?.users.email ?? ''}
                                    </p>
                                    <p className="text-[0.75rem] text-white mb-6 opacity-[0.5]">
                                        <span className="inline-flex"><i className="ri-map-pin-line me-1 align-middle"></i>
                                            {companyData?.address1 ?? ''}
                                        </span>
                                    </p>
                                    <div className="flex mb-0">

                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                                <div className="mb-6">
                                    <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
                                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                                        I am <b className="text-defaulttextcolor">Sonya Taylor,</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body !p-0">
                                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                                        <nav className="-mb-0.5 sm:flex md:space-x-4 rtl:space-x-reverse pb-2" role='tablist'>
                                            <Link className="w-full sm:w-auto flex active hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md py-2 px-4 text-primary text-sm" to="#" id="activity-tab" data-hs-tab="#activity-tab-pane" aria-controls="activity-tab-pane">
                                                <i className="bx bx-grid-alt header-link-icon text-[1.125rem]"></i>Service
                                            </Link>
                                        </nav>
                                    </div>
                                    <div className="box-body">
                                        <div className="table-responsive">
                                            <Spktables tableClass='table table-hover whitespace-nowrap min-w-full' header={
                                                [
                                                    { headerClassname: 'text-start', title: 'No' },
                                                    { headerClassname: 'text-start', title: 'Service' },
                                                    { headerClassname: 'text-start', title: 'Instaled' }
                                                ]} >
                                                {serviceData.map((item, index) => (
                                                    <tr className="border-t hover:bg-gray-200 dark:hover:bg-light" key={Math.random()}>
                                                        <td className="!ps-6">
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td >
                                                            {loadingState[item.id] ? (
                                                                <button className="btn btn-link" disabled>
                                                                    <SpkBadge
                                                                        key={item.id}
                                                                        customClass="!text-gray-700 me-2 mb-2 sm:mb-0"
                                                                        variant={
                                                                            "danger"
                                                                        }
                                                                    >
                                                                        <SpkSpinner customClass="!w-[1rem] !h-[1rem] me-1">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </SpkSpinner>
                                                                        {loadingState[item.id] === "installing" ? "Installing..." : "Uninstalling..."}
                                                                    </SpkBadge>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-link"
                                                                    onClick={() =>
                                                                        handleAction(item.id, item.isInstalled ? "uninstalling" : "installing")
                                                                    }
                                                                >
                                                                    <SpkBadge
                                                                        key={item.id}
                                                                        customClass="me-2 mb-2 sm:mb-0 text-white"
                                                                        variant={item.isInstalled ? "black" : "primary"}
                                                                    >
                                                                        {item.isInstalled ? "Uninstall" : "Install"}
                                                                    </SpkBadge>
                                                                </button>
                                                            )}

                                                        </td>
                                                    </tr>
                                                ))}
                                            </Spktables>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}



const checked = <input className="form-check-input" type="checkbox" id="checkboxNoLabeljob3" aria-label="..." defaultValue="" defaultChecked />;
const notchecked = <input className="form-check-input" type="checkbox" id="checkboxNoLabeljob2" aria-label="..." defaultValue="" />

export const Joblistdata: any[] = [
    {
        id: 1, class: 'HTML Developer - Fresher', class1: 'Remote/Onsite ', src: "", text1: 'BloomTech.Inc', color1: 'primary', statuscolor: 'primary',
        class2: 'M21.46777,2.3252A1.00007,1.00007,0,0,0,20.73,2H3.27a1.00039,1.00039,0,0,0-.99609,1.08887l1.52,17a.99944.99944,0,0,0,.72851.87451l7.2002,2A.99628.99628,0,0,0,11.99023,23a1.01206,1.01206,0,0,0,.26709-.03613l7.21973-2a1.00055,1.00055,0,0,0,.729-.875l1.52-17A1,1,0,0,0,21.46777,2.3252Zm-3.19238,16.896L11.99072,20.9624,5.72461,19.22168,4.36328,4H19.63672ZM7.81982,13h6.895l-.32714,3.271-2.56788.917L8.65625,16.05811a1.00017,1.00017,0,1,0-.67285,1.88378l3.5,1.25a1.00291,1.00291,0,0,0,.67285,0l3.5-1.25a1.00044,1.00044,0,0,0,.65869-.84228l.5-5A1.00064,1.00064,0,0,0,15.81982,11H8.72461L8.4248,8h7.895a1,1,0,0,0,0-2h-9a1.00064,1.00064,0,0,0-.99511,1.09961l.5,5A1.00012,1.00012,0,0,0,7.81982,13Z', class3: '', checked: notchecked, data: 'Full Time', data1: 'Oct 12 2022', text: 'Approved', text2: 'Nov 12 2022', color: 'primary', text3: 'Development', number: '10', number1: '15'
    },
];
