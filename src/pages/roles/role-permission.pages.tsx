import SelectComponent from '@/@spk/spk-packages/select-component';
import Spktables from '@/@spk/tables/spk-tables';
import Spktitlecards from '@/@spk/uielements/cards/spktitlecards';
import SpkBadge from '@/@spk/uielements/spk-badge';
import Pageheader from '@/components/common/page-header/pageheader';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
type select2Props = {
    value: any;
    label: any;
    data: any;
}
const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export default function RolePermission() {
    const [serviceListSelect, setServiceListSelect] = useState<select2Props[]>([{
        value: '',
        label: '',
        data: {}
    }]);
    const [loading, setLoading] = useState<boolean>(true);
    const getData = async () => {
        try {
            const response: any = await ApiRequest.get('/company-service-providers/user-company');
            if (response) {
                setServiceListSelect(response?.data?.map((item: any) => {
                    return {
                        value: item.id,
                        label: (
                            <div>
                                <img src={`${import.meta.env.VITE_BASE_API}/services/${item?.serviceProvider?.logo ?? ""}`} alt="" />
                                {item?.serviceProvider?.name}
                            </div>
                        ),
                        data: item
                    }
                }));
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
                currentpage='Company'
                activepage='Company'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
                mainpage='Create'
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                {/* Kolom pertama (4 kolom di md, full di mobile) */}
                <div className="md:col-span-4 rounded-lg">
                    <div className="box">
                        <div className="box-body">
                            <div className="card-text">
                                <label htmlFor="">Pilih Service</label>
                                <SelectComponent
                                    onfunchange={(e) => console.log(e)}
                                    option={serviceListSelect} mainClass="select2-client-search" defaultvalue={[serviceListSelect[0]]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom kedua (8 kolom di md, full di mobile) */}
                {/* <div className="md:col-span-8 rounded-lg">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Cardheader={true} Cardfooter={false} Title="Permission Service Featur" Customclass="custom-card">
                        <div className="table-responsive">
                            <Spktables tableRowclass='border-b border-defaultborder' tableClass="table whitespace-nowrap min-w-full" showCheckbox={true} header={[
                                { title: 'Permission Name' },
                                { title: 'Permission Description' }
                            ]}>
                                {serviceList.map((idx) => (
                                    <tr className="border-b border-defaultborder" key={Math.random()}>
                                        <th scope="row" className='w-10'><input className="form-check-input !border !border-primary" type="checkbox" id="checkboxNoLabel1" defaultValue="" aria-label="..." /></th>
                                        <td>
                                            {idx.name}
                                        </td>
                                        <td>{idx.desc}</td>
                                    </tr>
                                ))}
                            </Spktables>
                        </div>
                    </Spktitlecards>
                </div> */}
            </div>
        </Fragment>
    );
}
