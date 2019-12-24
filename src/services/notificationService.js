const setToastr = () => {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
};
const notifySuccess = (message, title) => {
    toastr.success(message, title);
};

const notifyError = (message, title) => {
    toastr.error(message, title);
};

export default {
    setToastr,
    notifySuccess,
    notifyError
};
