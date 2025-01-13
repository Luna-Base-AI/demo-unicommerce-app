import { BaseToast } from 'react-native-toast-message';
import CustomToast from '../components/common/CustomToast';

export const toastConfig = {
    success: (props) => <CustomToast {...props} />,
    error: (props) => <CustomToast {...props} type="error" />,
    info: (props) => <CustomToast {...props} type="info" />,
};
