import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface CutomCard {
  Title?: string;
  Text?: string;
  Imgsrc?: string;
  Linktext1?: string;
  Linktext2?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}

const SpkCustomcard: React.FC<CutomCard> = ({ Imgsrc, Text, Title, Linktext1, Linktext2, Navigate }) => {
  return (
    <Fragment>
      <div className="box">
            <img src={Imgsrc} className="card-img-top" alt="..." />
            <div className="box-body">
                <h6 className="box-title font-semibold !text-[1rem]">{Title}</h6>
                <p className="card-text">{Text}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
            </ul>
            <div className="box-body">
                <Link to={Navigate} className="card-link text-primary me-2">{Linktext1}</Link>
                <Link to={Navigate} className="card-link text-secondary inline-block">{Linktext2}</Link>
            </div>
        </div>
    </Fragment>
  )
}

export default SpkCustomcard