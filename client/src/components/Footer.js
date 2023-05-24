import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
} from 'mdb-react-ui-kit';

const Footer = () => {

    return (
        
        <div style={{ fontFamily: "Wix" }}>
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                <section className='d-flex justify-content-center p-4 border-bottom'>
                    <div className='me-5 d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/bazakulturnihzbivanja" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href="https://www.instagram.com/bazakulturnihzbivanja" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
                            <MDBIcon fab icon="instagram" />
                        </a>
                    </div>
                </section>
                <section>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    Udruženje Baza Kulturnih zbivanja
                                </h6>
                                <MDBRow>
                                    <p>
                                        <a href="/register" className='me-4 text-reset'>Become a member</a>
                                    </p>
                                    <p>
                                        <a href="/members" className='me-4 text-reset'>List of members</a>
                                    </p>
                                    <p>
                                        <a href="https://www.oblakoder.org.rs/zavirite-u-novootvoreni-prostor-bazu-kulturnih-zbivanja" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
                                            Read "Oblakoder" article about us!
                                        </a>
                                    </p>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                    Venizelosova 34, Belgrade, Serbia
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    bazakulturnihzbivanja
                                    @gmail.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> + 381 63 585585
                                </p>
                            </MDBCol>
                            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2830.084163826692!2d20.470402!3d44.81985!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab7a0ef3d71%3A0xcc71412c3d14eab5!2sVenizelosova%2034%2C%20Beograd!5e0!3m2!1sen!2srs!4v1684834277565!5m2!1sen!2srs"
                                    width="200"
                                    height="150"
                                    style={{ border: "1px solid #d4d4da" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    passive="true">
                                </iframe>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </MDBFooter>
        </div>
    );
};

export default Footer;
