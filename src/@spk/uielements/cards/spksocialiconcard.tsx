import React, { Fragment } from 'react'
import SpkButton from '../spk-button';

interface Social {
    Imgsrc?: string;
    Name?: string;
    Role?: string;
}
const SpkSocialiconcard: React.FC<Social> = ({ Name, Role, Imgsrc }) => {
    return (
        <Fragment>
               <div className="box text-center">
                    <div className="box-header !border-b-0 pb-0">
                        <span className="ms-auto shadow-sm text-[1.0625rem]"><i
                            className="ri-heart-fill text-danger"></i></span>
                    </div>
                    <div className="box-body !pt-1">
                        <span className="avatar avatar-xl avatar-rounded me-2 mb-2">
                            <img src={Imgsrc} alt="img" />
                        </span>
                        <div className="font-semibold text-[1rem]">{Name}</div>
                        <p className="mb-4 text-[#8c9097] dark:text-white/50 text-[.6875rem]">{Role}</p>
                        <div className="ti-btn-list">
                            <SpkButton variant="" buttontype="button" aria-label="button" customClass="!me-2 ti-btn ti-btn-icon ti-btn-facebook btn-wave">
                                <i className="ri-facebook-line"></i>
                            </SpkButton>
                            <SpkButton variant="" buttontype="button" aria-label="button" customClass="!me-2 ti-btn ti-btn-icon ti-btn-twitter btn-wave">
                                <i className="ri-twitter-x-line"></i>
                            </SpkButton>
                            <SpkButton variant="" buttontype="button" aria-label="button" customClass="ti-btn ti-btn-icon ti-btn-instagram btn-wave">
                                <i className="ri-instagram-line"></i>
                            </SpkButton>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default SpkSocialiconcard