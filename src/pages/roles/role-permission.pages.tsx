import SelectComponent from '@/@spk/spk-packages/select-component';
import Spktables from '@/@spk/tables/spk-tables';
import Spktitlecards from '@/@spk/uielements/cards/spktitlecards';
import SpkBadge from '@/@spk/uielements/spk-badge';
import Pageheader from '@/components/common/page-header/pageheader';
import GridJS from '@/Isomorphic/molecules/tables/GridJs';
import GridJSM2 from '@/Isomorphic/molecules/tables/GridJsM2';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';
import { _ } from 'gridjs-react';
import React, { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    const [permissions, setPermissions] = useState<any>([])
    const [serviceSelected, setServiceSelected] = useState<any>()
    const [keyInstance, setKeyInstance] = useState<string | null>(null);
    const { roleId } = useParams();

    const getData = async () => {
        try {
            const response: any = await ApiRequest.get('/service-providers/load/service');
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

    const hndelGetListPermission = (services: any) => {
        setKeyInstance(new Date().getTime().toString());
        setServiceSelected(services?.data?.serviceProvider)
    }

    const setRolePermission = async (rolePermission: any) => {
        const dataParsing = {
            "role_id": roleId,
            "permission_id": rolePermission.id
        }
        try {
            const perm: any = await ApiRequest.post("/role-permissions", dataParsing)
            toast.success("Success fully", {
                position: 'top-right',
            })
        } catch (error: any) {
            toast.error("Opps error", {
                position: 'top-right',
            })
        }
    }

    return (
        <Fragment>
            <Pageheader
                currentpage='Company'
                activepage='Company'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}company`}
                mainpage='Create'
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                <div className="md:col-span-4 rounded-lg">
                    <div className="box">
                        <div className="box-body">
                            <div className="card-text">
                                <label htmlFor="">Pilih Service</label>
                                <SelectComponent
                                    onfunchange={(e) => hndelGetListPermission(e)}
                                    option={serviceListSelect} mainClass="select2-client-search" defaultvalue={[serviceListSelect[0]]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom kedua (8 kolom di md, full di mobile) */}
                <div className="md:col-span-8 rounded-lg">
                    {serviceSelected && serviceSelected.reference_code &&
                        <GridJSM2
                            keyInstance={keyInstance}
                            url={`${Utils.baseApiUrl()}/permissions/${roleId ?? ''}/service/${serviceSelected?.reference_code}/selected`}
                            dataset={[
                                {
                                    label: {
                                        name: "No",
                                        width: "50px"
                                    },
                                    field: (row: any) => _(
                                        <input className="form-check-input ms-2"
                                            onChange={() => setRolePermission(row)}
                                            type="checkbox" defaultValue=""
                                            defaultChecked={row.role != null} />
                                    )
                                },
                                {
                                    label: "Permission Name",
                                    field: (row: any) => row.name
                                },
                                {
                                    label: "Description",
                                    field: (row: any) => row.description
                                },
                            ]}
                            limit={10}
                        />
                    }
                </div>
            </div>
        </Fragment>
    );
}
