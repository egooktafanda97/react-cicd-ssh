
import React, { Fragment } from 'react'
import SpkButton from '../spk-button'
import { Link } from 'react-router-dom';

interface Collapsecards {
    children?: React.ReactNode;
    footertext?: string;
    Title?: string;
    Timeout?: string;
    Custombodyclass?: string;
}
const SpkCollapsecard: React.FC<Collapsecards> = ({   children, Title, footertext, Timeout, Custombodyclass }) => {
    return (
        <Fragment>
             <div className="box">
                    <div className="box-header justify-between">
                        <div className="box-title">
                                {Title}
                        </div>
                        <Link aria-label="anchor" className="hs-collapse-toggle inline-flex items-center gap-x-2 open" to="#" id="hs-show-hide-collapse" data-hs-collapse="#hs-show-hide-collapse-heading">
                            <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                            </svg> 
                       </Link> 
                    </div>  
                    <div id="hs-show-hide-collapse-heading" className={`hs-collapse open w-full  overflow-hidden  transition-[height] duration-${Timeout}`} aria-labelledby="hs-show-hide-collapse">
                        <div className={`box-body ${Custombodyclass}`}>
                                {children}
                        </div>
                        <div className="box-footer"> 
                            <SpkButton buttontype="button" customClass="ti-btn ti-btn-primary-full">{footertext}</SpkButton> 
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}

export default SpkCollapsecard
