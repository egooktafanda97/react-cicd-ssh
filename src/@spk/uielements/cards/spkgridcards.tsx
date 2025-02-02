import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Gridcards {
  Imgsrc?: string
  Button?: boolean;
  Linktag?: boolean;
  Ptag?: boolean;
  Title?: string;
  Text?: string;
  Color?: string;
  Buttontext?: string;
  Customimgclass?: string;
  Customheadingclass?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkgridcards: React.FC<Gridcards> = ({ Imgsrc, Button = false, Customheadingclass, Navigate, Customimgclass, Ptag = true, Linktag = false, Color, Title, Buttontext, Text }) => {
  return (
    <Fragment>
        <div className="box">
              {Linktag ?
                <Link  to={Navigate} className="card-anchor"></Link>  : ""
              }
              <img src={Imgsrc} className={`card-img-top ${Customimgclass}`} alt="..." />
              <div className="box-body">
                  <h6 className={`box-title font-semibold ${Customheadingclass}`}>{Title}</h6>
                  {Ptag ?
                    <p className="card-text">{Text}</p> : ""}

                {Button ?
                  <Link to={Navigate} className={`btn btn-${Color}`}>{Buttontext}</Link>
                  : ''
                }
              </div>
          </div>
    </Fragment>
  )
}

export default Spkgridcards