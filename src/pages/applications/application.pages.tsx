import SpkProjectListCard from '@/@spk/apps/spk-projectlistcard';
import Pageheader from '@/components/common/page-header/pageheader';
import React, { Fragment, useEffect } from 'react';
import { authAvatarImageUrl } from '@/services/AssetResourcesService';
import SpkServiceListCard from '@/@spk/apps/spk-service-list';
import { Link } from 'react-router-dom';
import SpkDropdown from '@/@spk/uielements/spk-dropdown';
import OrderLogo from '@/assets/images/services/order.webp';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';

const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
});

export default function ApplicationPages() {
    const [dataService, setDataService] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const getData = async () => {
        try {
            const response: any = await ApiRequest.get('/service-providers/load/service');
            if (response) {
                console.log("<>", response?.data);

                setDataService(response?.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <Pageheader
                currentpage='App Service'
                activepage='App Service'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
                mainpage='App Service'
            />

            <div className='grid grid-cols-12 gap-x-6'>
                <div className='xl:col-span-12 col-span-12'>
                    <div className="grid grid-cols-12 gap-x-6">
                        {dataService.map((item: any) => (
                            <Link className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12" key={Math.random()} to={`${item.serviceProvider.base_domain}?token=${Utils.getAuthToken()}`} target='_blank'>
                                <div >
                                    <div className="box border border-primary">
                                        <div className="box-body undefined">
                                            <div className='flex items-center justify-between'>
                                                <div className="p-1 bg-primary/10 text-primary">
                                                    <img className=' w-20 h-20' src={`${import.meta.env.VITE_BASE_API}/services/${item?.serviceProvider?.logo ?? ""}`} alt="" />
                                                </div>
                                            </div>
                                            <p className="mb-0 mt-8 text-[1.25rem] font-semibold leading-none">
                                                {item?.serviceProvider?.name ?? ""}
                                            </p>
                                        </div>
                                        <div className="box-footer undefined">
                                            {item?.serviceProvider?.description ?? ""}
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment >
    );
}
