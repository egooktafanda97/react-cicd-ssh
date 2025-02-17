import SelectComponent from "@/@spk/spk-packages/select-component";
import Pageheader from "@/components/common/page-header/pageheader";
import GridJSM2 from "@/Isomorphic/molecules/tables/GridJsM2";
import AxiosService from "@/services/AxiosService";
import { Utils } from "@/utils/Utils";
import { _ } from "gridjs-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
});
interface FormData {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    avatar?: File;
    cover?: File;
}

export default function UserCompanyRoles() {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: undefined,
        cover: undefined,
    });
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [keyInstance, setKeyInstance] = useState<string | null>(null);
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

    const hendleSetRoleuser = async (row: any) => {
        try {
            await ApiRequest.post(`/users/set-role`, {
                user_id: id,
                role_id: row.id
            });
            toast.success("Success", {
                position: 'top-right',
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Failed", {
                position: 'top-right',
            });
        }
    }

    return (
        <Fragment>
            <Pageheader
                currentpage='Users'
                activepage='Users'
                activepage_link={`${import.meta.env.VITE_META_BASE_PATH}/users`}
                mainpage='User Role'
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                <div className="md:col-span-4 rounded-lg">
                    <div className="box">
                        <div className="box-body">
                            <div className="card-text">
                                <div className="flex flex-col">
                                    <label htmlFor="">Name</label>
                                    <strong>
                                        {formData.name}
                                    </strong>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom kedua (8 kolom di md, full di mobile) */}
                <div className="md:col-span-8 rounded-lg">
                    <GridJSM2
                        keyInstance={keyInstance}
                        url={`${Utils.baseApiUrl()}/roles/${id}/user`}
                        dataset={[
                            {
                                label: {
                                    name: "No",
                                    width: "50px"
                                },
                                field: (row: any) => _(
                                    <input className="form-check-input ms-2"
                                        onChange={() => hendleSetRoleuser(row)}
                                        type="checkbox" defaultValue=""
                                        defaultChecked={row.users != null} />
                                )
                            },
                            {
                                label: "Role Name",
                                field: (row: any) => row.name
                            },
                            {
                                label: "Description",
                                field: (row: any) => row.description
                            },
                        ]}
                        limit={10}
                    />
                </div>
            </div>
        </Fragment>
    );
}