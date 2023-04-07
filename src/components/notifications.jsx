import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const successNotification = async (title='Success!') => {
    return MySwal.fire({
        icon: 'success',
        title: <p>{title}</p>,
        didOpen: () => {
            MySwal.clickConfirm()
        }
    }).then(() => MySwal.fire(title, '', 'success'));
}

export const errorNotification = async (title='Error!') => {
    return MySwal.fire({
        icon: 'error',
        title: <p>{title}</p>,
        didOpen: () => {
            MySwal.clickConfirm()
        }
    }).then(() => MySwal.fire(title, '', 'error'));
}