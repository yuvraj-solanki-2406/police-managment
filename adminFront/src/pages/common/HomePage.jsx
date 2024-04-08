import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

document.title = "Mp Police"

function HomePage() {
    const notify = () => toast.warning("Wow so easy!");
    return (
        <>
            <main>
                <header className='row home_header'>
                    <nav className='col-8 home_nav'>
                        <img src="../../public/images/logo (2).png" alt="Logo" className='logo_img_home' />
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><Link to="/community">Community</Link></li>
                        </ul>
                    </nav>
                    <div className="search-bar col-4">
                        <Link to="/jawan/login" className='btn btn-secondary bg-white text-dark border shadow'>
                            Jawan Login
                        </Link>
                    </div>
                </header>

                <div className="carousel slide" data-ride="carousel">
                    {/* <!-- Wrapper for slides --> */}
                    <div className="parent row mt-4">
                        <div className="col-md-3">
                            <div className="card w-100">
                                <div className="card-body shadow ms-2 rounded-3">
                                    <h2 className="card-title">Citizen Services</h2>
                                    <h6 className="card-subtitle mb-2 text-center">In Case of any inconvenience regarding Citizen Services, Call on 0755-3501600</h6>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <h6 className="text-center">Report Online</h6>
                                            <div className="list">
                                                <ul className="">
                                                    <li>
                                                        <Link to="/community" className="">Community</Link>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="">Citizen Engagement</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="">Hate Speech Detection</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center">Report Online</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="swiper mySwiper">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <img className="swiper_img" src="../../public/images/CompressJPEG.online_1280x720_image (1).jpg" alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img className="swiper_img" src="../../public/images/CompressJPEG.online_1280x720_image (2).jpg" alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img className="swiper_img" src="../../public/images/CompressJPEG.online_1280x720_image (3).jpg" alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img className="swiper_img" src="../../public/images/CompressJPEG.online_1280x720_image.jpeg" alt="" />
                                    </div>
                                    <div className="swiper-slide">
                                        <img className="swiper_img" src="../../public/images/CompressJPEG.online_1280x720_image.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card shadow me-3 rounded-3">
                                <img src="../../public/images/DG_Saxena.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Left and right controls --> */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <div className="section-info my-4">
                    <div className="container">
                        <h3 className='my-4'>Message from Authority</h3>
                        <div className="row">
                            <div className="col-4">
                                <img src="../../public/images/police-2.jpeg" alt="Your Image" className="rounded-3 shadow" />
                            </div>
                            <div className="text-container col-7 d-flex justify-center align-items-center">
                                <p className='text-justify'>Tokenization is the most common task for an NLP Project
                                    • Tokenization is splitting a phrase, sentence, paragraph, or an entire
                                    text document into smaller units, such as individual words or terms.
                                    • Each of these smaller units are called tokens.
                                    • The tokens could be words, numbers or punctuation marks.
                                    • For any NLP project, the first step is to identify the words.
                                    • Therefore the tokenization is the most basic step to proceed with NLP
                                    (text data)</p>
                            </div>
                        </div>

                        {/* Item -2 */}
                        <div className="row my-4">
                            <div className="text-container col-7 d-flex justify-center align-items-center">
                                <p className='text-justify'>Tokenization is the most common task for an NLP Project
                                    • Tokenization is splitting a phrase, sentence, paragraph, or an entire
                                    text document into smaller units, such as individual words or terms.
                                    • Each of these smaller units are called tokens.
                                    • The tokens could be words, numbers or punctuation marks.
                                    • For any NLP project, the first step is to identify the words.
                                    • Therefore the tokenization is the most basic step to proceed with NLP
                                    (text data)</p>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <img src="../../public/images/police-1.jpeg" alt="Your Image"
                                    className="rounded-3"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section className="testimonials">
                    <h2>Testimonials</h2>
                    <div className="testimonial-images">
                        <div className="testimonial-container">
                            <div className="testimonial-image">
                                <img src="../../public/images/police-1.jpeg" alt="Testimonial 1" />
                            </div>
                            <p>Testimonial 1 text</p>
                        </div>
                        <div className="testimonial-container">
                            <div className="testimonial-image">
                                <img src="../../public/images/police-2.jpeg" alt="Testimonial 2" />
                            </div>
                            <p>Testimonial 2 text</p>
                        </div>
                        <div className="testimonial-container">
                            <div className="testimonial-image">
                                <img src="../../public/images/police-3.jpeg" alt="Testimonial 3" />
                            </div>
                            <p>Testimonial 3 text</p>
                        </div>
                    </div>
                </section>

                <div>
                    <button onClick={notify}>Notify!</button>
                    <ToastContainer />
                </div>
                <footer>
                    <p>&copy; 2023 My Web Page. All rights reserved.</p>
                </footer>
            </main>
        </>
    )
}

export default HomePage
