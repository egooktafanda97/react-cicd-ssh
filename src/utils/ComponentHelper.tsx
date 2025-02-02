import AxiosService from '@/services/AxiosService';
import Swal from 'sweetalert2'
import { Utils } from './Utils';


const apiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
});

type FunctionProps = {
    title?: string;
    text?: string;
    url: string;
    callback?: () => void;
    onCancel?: () => void;
}
export const deleteFunction = (props: FunctionProps) => {
    Swal.fire({
        title: props.title ?? "Are you sure?",
        text: props.text ?? "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            apiRequest.delete(props.url).then((res) => {
                if (res.status === 200) {
                    if (props.callback) {
                        props.callback();
                        return;
                    } else {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }

                }
            });
            return;
        }
        if (props.onCancel)
            props.onCancel();
    });
}