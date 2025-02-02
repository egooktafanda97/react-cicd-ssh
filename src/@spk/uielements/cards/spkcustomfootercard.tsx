import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface CutomFooter {
  Title?: string;
  Text?: string;
  Imgsrc?: string;
  Linktext1?: string;
  Linktext2?: string;
  Subtitle?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}
const SpkCustomfootercard: React.FC<CutomFooter> = ({ Linktext1, Title, Subtitle, Text, Linktext2 , Navigate}) => {
  return (
    <Fragment>
      <div className="box">
            <div className="box-body">
                <h6 className="box-title font-semibold !mb-1 !text-[1rem]">{Title}</h6>
                <p className="card-subtitle mb-4 text-[#8c9097] dark:text-white/50">{Subtitle}</p>
                <p className="card-text">{Text}</p>
            </div>
            <div className="box-footer">
                <Link to={Navigate} className="card-link text-danger m-1">{Linktext1}</Link>
                <Link to={Navigate} className="card-link text-success m-1"><u>{Linktext2}</u></Link>
            </div>
        </div>
    </Fragment>
  )
}

export default SpkCustomfootercard