import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Alignment {
    Imagesrc?: string
    Buttontext?: string;
    Text?: string;
    Title?: string;
    Customclass?: string;
    Customtitleclass?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkalignmentcards: React.FC<Alignment> = ({ Imagesrc, Customclass,Customtitleclass, Title, Text, Buttontext , Navigate}) => {
    return (
        <Fragment>
            <div className={`box ${Customclass}`}>
                    <div className="box-body">
                        <div className="mb-2">
                            <span className="avatar avatar-md">
                                <img src={Imagesrc} alt="img" className="!rounded-md" />
                            </span>
                        </div>
                        <h6 className={`box-title ${Customtitleclass}`}>{Title}</h6>
                        <p className="card-text mb-4">{Text}</p>
                        <Link to={Navigate} className="ti-btn ti-btn-primary-full">{Buttontext}</Link>
                    </div>
                </div>
        </Fragment>
    )
}

export default Spkalignmentcards