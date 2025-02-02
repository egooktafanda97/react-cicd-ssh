import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import SpkDropdown from '../spk-dropdown';

interface Dropdowncardtype {
    Text?: string;
    Imgsrc?: string;
    Gender?: string;
    Date?: string;
    Role?: string;
    Title?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}

const SpkDropdowncard: React.FC<Dropdowncardtype> = ({ Text, Imgsrc, Gender, Date, Role, Title, Navigate }) => {
    return (
        <Fragment>
             <div className="box">
                        <div className="box-header">
                            <div className="flex align-center w-full">
                                <img src={Imgsrc} alt="img" className="avatar avatar-rounded me-2 !mb-0" />
                                <div className="my-auto">
                                    <div className="text-[.9375rem] font-semibold">{Title}</div>
                                    <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[.6875rem]">{Gender}</p>
                                </div>
                                <SpkDropdown Icon={true} Customclass="ms-auto my-auto"  Linktag={true}  arialexpand={false}  IconClass="fe fe-more-vertical"
                                    Linkclass="ti-btn ti-btn-icon ti-btn-sm ti-btn-light !mb-0">
                                        <li><Link className="ti-dropdown-item" to={Navigate}>Week</Link></li>
                                        <li><Link className="ti-dropdown-item" to={Navigate}>Month</Link></li>
                                        <li><Link className="ti-dropdown-item" to={Navigate}>Year</Link></li>
                                </SpkDropdown>
                            </div>
                        </div>
                        <div className="box-body">
                            {Text}
                        </div>
                        <div className="box-footer">
                            <div className="flex justify-between">
                                <div className="font-semibold text-[.875rem]">{Date}</div>
                                <div className="font-semibold text-success ">{Role}</div>
                            </div>
                        </div>
                    </div>
        </Fragment>
    )
}

export default SpkDropdowncard