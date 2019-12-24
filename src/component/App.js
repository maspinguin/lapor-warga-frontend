import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NotificationService from "../services/notificationService";
import apiService from "../services/apiService";

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            captchaValue: '',
            fileFotoIdentitas: {},
            fileFotoWajah: {},
            sending: false
        }

    }

    componentDidMount() {
        NotificationService.setToastr();
    }

    onChange(value) {
        this.setState({
            captchaValue: value
        });
    }

    validate() {
        if(this.state.captchaValue === '') {
            return false;
        }

        return true;
    }


    render() {
        const submitSchema = Yup.object().shape({
            nama: Yup.string()
                .min(2, 'Nama terlalu pendek.')
                .required('Nama diperlukan'),
            identitas: Yup.string()
                .min(2, 'Nomor Identitas terlalu pendek.')
                .required('Nomor Identitas diperlukan.'),
            fotoIdentitas: Yup.string()
                .required('Foto identitas diperlukan.'),
            fotoWajah: Yup.string()
                .required('Foto wajah diperlukan.'),
            noHandphone: Yup.string()
                .required('No Handphone diperlukan.'),
            noRumahInap: Yup.string()
                .required('No Rumah diperlukan.'),
            alamat: Yup.string()
                .required('Alamat diperlukan.'),
            lamaInap: Yup.string()
                .required('Alamat diperlukan.'),
            keterangan: Yup.string()
                .required('Keterangan diperlukan.')
        });



        return (
            <div className="container">
                <div className="row">
                    <h3 className="col-md-12">Form Laporan Tamu Green Living Residence</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Formik
                            initialValues={{
                                nama: '',
                                identitas: '',
                                fotoIdentitas: '',
                                fotoWajah: '',
                                noHandphone: '',
                                noRumahInap: '',
                                alamat: '',
                                lamaInap: '',
                                keterangan: ''
                            }}
                            validationSchema={submitSchema}
                            onSubmit={async (values, {resetForm}) => {
                                // same shape as initial values
                                if(this.validate()) {
                                    this.setState({
                                        sending: true
                                    });
                                    const message = `
                                    Laporan Tamu Masuk\n
                                    Nama: ${values.nama}\n
                                    Alamat: ${values.alamat}\n
                                    No Telepon: ${values.noHandphone}\n
                                    No Rumah Inap: ${values.noRumahInap}\n
                                    Lama Inap: ${values.lamaInap}\n
                                    Keterangan: ${values.keterangan}
                                    `;

                                    const CaptionWajah = `Foto Wajah dari ${values.nama} (${values.identitas})`;
                                    const CaptionIdentitas = `Foto Identitas dari ${values.nama} (${values.identitas})`;

                                    try {
                                        await apiService.sendMessage(message);
                                        await apiService.sendPhoto(this.state.fileFotoIdentitas, CaptionIdentitas);
                                        await apiService.sendPhoto(this.state.fileFotoWajah, CaptionWajah)
                                        NotificationService.notifySuccess('Sukses melakukan pengisian');
                                        this.setState({
                                            sending: false
                                        });

                                        resetForm();
                                    } catch (e) {
                                        NotificationService.notifyError('Jaringan gagal!');
                                        this.setState({
                                            sending: false
                                        })
                                    }

                                } else {
                                    NotificationService.notifyError('Anda harus melakukan validasi google recaptcha!');
                                }

                            }}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    <div className="form-group">
                                        <label>Nama</label>
                                        <Field
                                            className="form-control"
                                            name="nama"
                                        />
                                        {errors.nama && touched.nama ? (
                                            <div style={{color: 'red'}}>{errors.nama}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor Identitas (KTP/SIM/Passport)</label>
                                        <Field
                                            className="form-control"
                                            name="identitas"
                                        />
                                        {errors.identitas && touched.identitas ? (
                                            <div style={{color: 'red'}}>{errors.identitas}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>File Foto Identitas</label>
                                        <input
                                            name="fotoIdentitas"
                                            type="file"
                                            onChange={(ev) => {
                                                this.setState({
                                                    fileFotoIdentitas: ev.currentTarget.files[0]
                                                });
                                                setFieldValue("fotoIdentitas", ev.currentTarget.files[0]);
                                            }}
                                        />
                                        {errors.fotoIdentitas && touched.fotoIdentitas ? (
                                            <div style={{color: 'red'}}>{errors.fotoIdentitas}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label>File Foto Wajah</label>
                                        <input
                                            name="fotoWajah"
                                            type="file"
                                            id="fotoWajah"
                                            onChange={(ev) => {
                                                this.setState({
                                                    fileFotoWajah: ev.currentTarget.files[0]
                                                });
                                                setFieldValue("fotoWajah", ev.currentTarget.files[0]);
                                            }}
                                        />
                                        {errors.fotoWajah  && touched.fotoWajah ? (
                                            <div style={{color: 'red'}}>{errors.fotoWajah}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor Hp/ Kontak</label>
                                        <Field
                                            className="form-control"
                                            name="noHandphone"
                                        />
                                        {errors.noHandphone && touched.noHandphone ? (
                                            <div style={{color: 'red'}}>{errors.noHandphone}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor Rumah Tempat Inap</label>
                                        <Field
                                            className="form-control"
                                            name="noRumahInap"
                                        />
                                        {errors.noRumahInap && touched.noRumahInap ? (
                                            <div style={{color: 'red'}}>{errors.noRumahInap}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Asal (sesuai ktp)</label>
                                        <Field
                                            as="textarea"
                                            className="form-control"
                                            name="alamat"
                                        />
                                        {errors.alamat && touched.alamat ? (
                                            <div style={{color: 'red'}}>{errors.alamat}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Lama Inap</label>
                                        <Field
                                            className="form-control"
                                            name="lamaInap"
                                        />
                                        {errors.lamaInap && touched.lamaInap ? (
                                            <div style={{color: 'red'}}>{errors.lamaInap}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Keterangan</label>
                                        <Field
                                            className="form-control"
                                            name="keterangan"
                                        />
                                        {errors.keterangan && touched.keterangan ? (
                                            <div style={{color: 'red'}}>{errors.keterangan}</div>
                                        ) : null}
                                    </div>
                                    <ReCAPTCHA
                                        sitekey={`${process.env.google_site_key_captchav2}`}
                                        onChange={(v) => this.onChange(v)}
                                    />
                                    <br/>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={this.state.sending}
                                    >Kirim</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
