import './about.css';
import React from "react";
import { useState,useEffect,useRef } from "react";

function About(){

    function handleClick(){
        let modal = document.getElementById("about-modal");
        let switchButton = document.getElementById("modalSwitchButton");
        
        if (modal.classList.contains("active")) {
            modal.classList.remove("switched");
            switchButton.innerHTML = "CONTACT US";
        }

        modal.classList.toggle("active");
    }
    function closeModal() {
        console.log('close')
        let modal = document.getElementById("about-modal");
        let switchButton = document.getElementById("modalSwitchButton");
    
        modal.classList.add("close");
    
        setTimeout(function () {
            modal.classList.remove("close");
            modal.classList.remove("switched");
            modal.classList.remove("active");
            switchButton.innerHTML = "CONTACT US";
        }, 300);
    }
    function switchModal() {
        let modal = document.getElementById("about-modal");
        let switchButton = document.getElementById("modalSwitchButton");
        modal.classList.toggle("switched");
    
        if (modal.classList.contains("switched")) {
            switchButton.innerHTML = "Back";
        } else {
            switchButton.innerHTML = "CONTACT US";
        }
    }

    return (
        <div className='about'>
        <div id="about-modal" class="modal">
            <div class="groups">
                <div class="group-1">
                    <div class="layer-1 dbg flex-center">
                        <div class="frame-picture"></div>
                        <div class="about-picture"></div>
                    </div>
                    {/* <div class="layer-2 lbg">
                        <div class="layer-content">
                            <h3>Page 3</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quod sapiente totam laborum dolorum sint quaerat excepturi itaque pariatur voluptatibus facere, beatae alias, nam, vitae provident! Error tempore assumenda exercitationem.</p>
                            <button onclick="switchModal();">Switch</button>
                        </div>
                    </div> */}
                </div>
                <div class="group-2">
                    <div class="close-section">
                        <div class="close-container" onClick={closeModal}>
                                <div class="leftright"></div>
                                <div class="rightleft"></div>
                                <label class="close">CLOSE</label>
                        </div>
                    </div>
                    <div class="layer-1 lbg flex-center">
                        <div class="layer-content">
                            <h3 style={{marginBottom:'15px'}}>Expense Tracker</h3>
                            <h6 style={{marginBottom:'50px'}}>"The best investment you can make is in yourself" - Warren Buffet</h6>
                            <p style={{marginBottom:'15px'}}>We are a team of highly talented and motivated individuals who are driven by one common goal that is to make every person in the world financially aware. Our founder Mr. Anmol Kaushik has an engineering degree in electronics and communication from IIIT Delhi. He launched the app in 2023 and since then we have seen an enormous growth in our subscribers. Your input helps us to improve and serve you better. We want every individual to make sound financial decision as risk comes from not knowing what you're doing.</p>

                            <p style={{marginBottom:'15px'}}>We are constantly improving and building tools that can help you keep track of all your finances without having to manually make long excel sheets. <br></br> <br></br> <br></br>
                            Our current tools include: Expense tracker, Stock market charts, Mutual fund recommendation, Crypto currency and Blogs.</p>

                            <p style={{marginBottom:'50px'}}>Future road map is to connect the app with various banks in India so that any transaction you make using your bank account will be directly reflected in the app further reducing the need to manually add transactions. Only the cash transactions will require manual addition.</p>
                            <div class="btn-arrow-2 light" onClick={switchModal}>
                                <div id="modalSwitchButton" style={{display:'inline',fontWeight:'700'}}>CONTACT US</div>
                                <svg width="24" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                                    <path d="M15 4H4V1" stroke="#112b3c" />
                                    <path d="M14.5 4H3.5H0" stroke="#112b3c" />
                                    <path d="M15.8536 4.35355C16.0488 4.15829 16.0488 3.84171 15.8536 3.64645L12.6716 0.464466C12.4763 0.269204 12.1597 0.269204 11.9645 0.464466C11.7692 0.659728 11.7692 0.976311 11.9645 1.17157L14.7929 4L11.9645 6.82843C11.7692 7.02369 11.7692 7.34027 11.9645 7.53553C12.1597 7.7308 12.4763 7.7308 12.6716 7.53553L15.8536 4.35355ZM15 4.5L15.5 4.5L15.5 3.5L15 3.5L15 4.5Z" fill="#112b3c" />
                                </svg>
                                <div className='close-hover' style={{background: 'linear-gradient(rgb(255, 128, 52) 29%, rgb(255, 50, 48) 80%)'}}></div>
                            </div>
                        </div>
                    </div>
                    <div class="layer-2 dbg  flex-center">
                        <div class="layer-content">
                            <h3 style={{marginBottom:'15px'}}>Connect with us !</h3>
                            <h6 style={{marginBottom:'50px'}}>CONTACT US</h6>

                            <div class="form-group">
                                <input type="text" id="name" required></input>
                                <label for="name">Name</label>
                            </div>
                            <div class="form-group">
                                <input type="email" id="email" required></input>
                                <label for="email">E-mail</label>
                            </div>
                            <div class="form-group" style={{marginBottom:'50px'}}>
                                <textarea id="message" cols="30" rows="10"></textarea>
                                <label for="message">Message</label>
                            </div>

                            <div class="btn-arrow linear-bg-1">
                                Send message
                                <svg width="24" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                                    <path d="M15 4H4V1" stroke="white" />
                                    <path d="M14.5 4H3.5H0" stroke="white" />
                                    <path d="M15.8536 4.35355C16.0488 4.15829 16.0488 3.84171 15.8536 3.64645L12.6716 0.464466C12.4763 0.269204 12.1597 0.269204 11.9645 0.464466C11.7692 0.659728 11.7692 0.976311 11.9645 1.17157L14.7929 4L11.9645 6.82843C11.7692 7.02369 11.7692 7.34027 11.9645 7.53553C12.1597 7.7308 12.4763 7.7308 12.6716 7.53553L15.8536 4.35355ZM15 4.5L15.5 4.5L15.5 3.5L15 3.5L15 4.5Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="header">
            <div class="content">
                <div class="logo" style={{width:'83%',height:'87%'}}>
                    <svg style={{height:'32rem', width:'33rem'}} xmlns="http://www.w3.org/2000/svg" width="636" height="617" viewBox="0 0 636 617" fill="none">
                        <path d="M628.164 270.574L626.73 267.431L624.877 264.517C606.606 235.831 580.994 220.116 558.409 206.26C522.386 184.159 493.945 166.713 485.487 91.5971L475.216 0.387912L404.296 58.7936C378.514 80.0194 359.845 106.845 350.301 136.366C340.926 165.36 340.986 195.647 350.45 221.647L350.709 222.344L350.978 223.03C351.257 223.736 351.536 224.432 351.825 225.129L337.848 238.238C329.799 245.777 322.716 253.864 316.659 262.358C310.751 254.033 303.867 246.106 296.057 238.696L282.19 225.526C282.509 224.731 282.837 223.935 283.146 223.129L283.425 222.443L283.674 221.757C293.029 195.856 293.118 165.678 283.933 136.794C274.539 107.273 256.099 80.4372 230.606 59.1915L159.546 0L149.186 91.806C140.678 167.2 112.505 184.726 76.8407 206.907C54.4558 220.822 29.0923 236.587 10.9911 265.302L9.14812 268.217L7.73351 271.35C0.730137 286.866 -1.53126 303.368 1.00908 320.406C3.28044 335.594 9.30751 350.932 19.429 367.284C24.5595 375.569 30.1981 383.556 36.2052 391.036C58.61 419.065 83.3958 437.665 107.365 455.658C128.325 471.384 148.13 486.244 165.255 507.032C167.705 510.026 170.076 512.94 172.357 515.745C177.289 521.822 181.762 527.422 186.085 532.833C196.426 545.783 205.362 556.973 213.83 566.273L214.637 567.158L215.474 568.004L227.837 580.347C251.516 603.98 282.987 617 316.469 617C349.952 617 381.422 603.98 405.102 580.347L417.924 567.526L418.651 566.8L419.358 566.034C427.876 556.784 436.872 545.674 447.272 532.803C451.735 527.293 456.338 521.603 461.418 515.407C463.819 512.482 466.21 509.608 468.501 506.853L468.521 506.833L468.541 506.813C485.925 485.945 506.009 471.035 527.278 455.25C551.526 437.257 576.6 418.647 599.274 390.628C605.321 383.178 611.019 375.211 616.22 366.936C626.51 350.534 632.627 335.176 634.948 319.948C637.568 302.781 635.287 286.17 628.164 270.574ZM574.02 340.508C569.746 347.311 565.243 353.567 560.531 359.366C522.795 405.995 472.277 424.565 430.247 475.004C427.697 478.058 425.246 481.022 422.895 483.886C405.79 504.724 393.377 520.768 382.688 532.375L369.876 545.176L356.447 555.859C355.391 556.525 354.316 557.152 353.23 557.759L349.942 559.479C348.836 560.027 347.721 560.544 346.585 561.031C346.027 561.28 345.459 561.519 344.891 561.747C335.796 565.428 326.133 567.268 316.469 567.268C306.199 567.268 295.928 565.189 286.354 561.031C285.218 560.544 284.103 560.027 282.997 559.479C281.891 558.932 280.795 558.356 279.709 557.759C278.623 557.152 277.547 556.525 276.491 555.859C271.72 552.875 267.207 549.324 263.063 545.176L250.7 532.833C240.15 521.235 227.896 505.212 211.02 484.384C208.689 481.519 206.269 478.555 203.768 475.501C162.276 425.093 112.356 406.582 75.1073 359.983C70.455 354.184 66.0119 347.938 61.7979 341.134C48.3491 319.411 47.4126 304.482 53.1408 291.8C89.134 234.717 181.871 246.394 198.687 97.376C237.56 129.762 247.821 174.402 236.812 204.888C200.999 295.56 128.385 299.12 207.085 366.388C247.91 329.308 252.054 297.897 261.738 274.732C274.708 287.045 327.288 341.801 254.196 413.495C255.232 414.728 256.527 416.29 258.042 418.13C259.456 419.861 260.931 421.522 262.465 423.103C266.539 427.281 270.992 430.901 275.714 433.945C276.302 434.323 276.9 434.701 277.498 435.059C278.484 435.656 279.48 436.223 280.486 436.76C281.313 437.217 282.15 437.655 282.987 438.073C284.232 438.68 285.487 439.266 286.743 439.803C296.256 443.872 306.438 445.911 316.629 445.911C321.351 445.911 326.073 445.473 330.725 444.598C331.911 444.379 333.076 444.13 334.242 443.842C334.561 443.772 334.889 443.693 335.208 443.613C336.354 443.325 337.5 443.006 338.625 442.668C339.442 442.419 340.259 442.161 341.076 441.882C342.022 441.564 342.959 441.216 343.895 440.858C347.89 439.326 351.785 437.436 355.511 435.188C357.304 434.114 359.048 432.96 360.761 431.727C365.892 428.027 370.653 423.601 374.897 418.448C376.671 416.3 378.175 414.49 379.35 413.117C305.551 341.602 358.808 286.807 371.949 274.483C381.691 297.609 385.846 328.99 427.059 365.981C506.746 298.633 433.335 295.192 397.262 204.649C386.174 174.203 396.625 129.573 435.985 97.1572C452.751 246.036 546.544 234.22 582.846 291.203C588.625 303.855 587.648 318.785 574.02 340.508Z" fill="url(#paint0_linear_443_46)" />
                        <defs>
                            <linearGradient id="paint0_linear_443_46" x1="318" y1="0" x2="318" y2="617" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#1C4B82" />
                                <stop offset="1" stop-color="#1C4B82" stop-opacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div style={{marginBottom:'50px'}} class="title">
                    <h1 style={{marginBottom:'10px'}}>About <span>us</span></h1>
                    <p><span>Click</span> below to learn more about expense tracker</p>
                    <hr></hr>
                    <button class="btn-arrow linear-bg-1" style={{color:"white",fontSize:'112%',borderRadius:'5%'}} onClick={handleClick}>About us
                        <svg width="24" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                            {/* <path d="M15 4H4V1" stroke="white" /> */}
                            <path d="M14.5 4H3.5H0" stroke="white" />
                            <path d="M15.8536 4.35355C16.0488 4.15829 16.0488 3.84171 15.8536 3.64645L12.6716 0.464466C12.4763 0.269204 12.1597 0.269204 11.9645 0.464466C11.7692 0.659728 11.7692 0.976311 11.9645 1.17157L14.7929 4L11.9645 6.82843C11.7692 7.02369 11.7692 7.34027 11.9645 7.53553C12.1597 7.7308 12.4763 7.7308 12.6716 7.53553L15.8536 4.35355ZM15 4.5L15.5 4.5L15.5 3.5L15 3.5L15 4.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default About;