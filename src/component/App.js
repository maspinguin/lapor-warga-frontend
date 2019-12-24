import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NotificationService from "../services/notificationService";

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            captchaValue: '',
            nama: '',
            identitas: '',
            fileFotoIdentitas: null,
            fileFotoWajah: null,
            nomorHp: '',
            alamat: '',
            lamaInap: '',
            keterangan: ''
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
                    <h3 className="col-md-12">Form Laporan Tamu</h3>
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
                                alamat: '',
                                lamaInap: '',
                                keterangan: ''
                            }}
                            validationSchema={submitSchema}
                            onSubmit={values => {
                                // same shape as initial values
                                if(this.validate()) {
                                    console.log(values);
                                } else {
                                    NotificationService.notifyError('Anda harus melakukan validasi google recaptcha!');
                                }

                            }}
                        >
                            {({ errors, touched }) => (
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
                                        <Field
                                            name="fotoIdentitas"
                                            type="file"
                                        />
                                        {errors.fotoIdentitas && touched.fotoIdentitas ? (
                                            <div style={{color: 'red'}}>{errors.fotoIdentitas}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label>File Foto Wajah</label>
                                        <Field
                                            name="fotoWajah"
                                            type="file"
                                        />
                                        {errors.fotoWajah && touched.fotoWajah ? (
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
                                        <label>Alamat</label>
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
                                        sitekey="6Lfpy8kUAAAAAJMynzLuKcoQnpxm1SuZ6L5uk1Rr"
                                        onChange={(v) => this.onChange(v)}
                                    />
                                    <br/>
                                    <button type="submit" className="btn btn-primary">Kirim</button>
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
