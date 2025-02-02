import React, { Fragment } from 'react'
import SpkBadge from '../spk-badge';
import { Link } from 'react-router-dom';

interface Markupcards {
  Imgsrc?: string
  Customimgclass?: string;
  Linktag?: boolean;
  Title?: string;
  Button?: boolean;
  Buttontext?: string;
  Text?: string;
  Badgetext?: string;
  Color?: string;
  Badgeclass?: string;
  Customtextclass?: string;
  Customtitleclass?: string;
  Badge?: boolean;
  Navigate: string | URL; // Ensure Navigate is always defined
}

const Spkgridmarkupcard: React.FC<Markupcards> = ({ Imgsrc, Customimgclass, Navigate, Customtextclass, Customtitleclass, Linktag = false, Title, Color, Buttontext, Badge = false, Badgeclass, Text, Badgetext,  }) => {
  return (
    <Fragment>
        <div className="box">
            <div className="box-body">
                <img src={Imgsrc} className={Customimgclass} alt="..." />
                <h6 className={`box-title !font-semibold ${Customtitleclass}`}>{Title} 
                   {Badge?  <SpkBadge customClass={Badgeclass}>{Badgetext}</SpkBadge>:""}
                </h6>
                <p className={`card-text ${Customtextclass}`}>{Text}</p>
                {Linktag ? <Link to={Navigate} className={`ti-btn ti-btn-${Color}`}>{Buttontext}</Link> :""}
            </div>
        </div>
</Fragment>
  )
}

export default Spkgridmarkupcard