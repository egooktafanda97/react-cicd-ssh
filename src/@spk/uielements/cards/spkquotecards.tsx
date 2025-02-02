import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Quotes {
  Customclass?: string
  CustomBodyclass?: string;
  Text?: string;
  Footertext?: string;
  Title?: string;
  Footerclass?: string;
  Headingclass?: string;
  Linktag?: boolean;
  Navigate: string | URL; // Ensure Navigate is always defined
}
const SpkQuotecards: React.FC<Quotes> = ({ Customclass, Linktag = false, CustomBodyclass, Navigate, Headingclass, Text, Title, Footerclass, Footertext }) => {
  return (
    <Fragment>
    
       <div className={`box ${Customclass}`}>
            {Linktag ?  <Link aria-label="anchor" to={Navigate} className="card-anchor"></Link>  : ''}
            <div className={`box-body ${CustomBodyclass}`}>
                <blockquote className="blockquote mb-0 text-center">
                    <h6 className={Headingclass}>{Text}</h6>
                    <footer className={`blockquote-footer mt-3 ${Footerclass}`}>
                       {Footertext} <cite title="Source Title">{Title}</cite>
                    </footer>
                </blockquote>
            </div>
        </div>
    </Fragment>
  )
}

export default SpkQuotecards