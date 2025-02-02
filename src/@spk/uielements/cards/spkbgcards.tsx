
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface cardprops {
    Title?: string;
    color?: string;
    Customclass?: string;
    Value?: string;
    Imgsrc?: string
    Textclass?: string
    Class?: string
    Imgclass?: string
    Navigate: string | URL;
}
const Spkbgcards: React.FC<cardprops> = ({ Title, Customclass, color, Value, Imgsrc,Imgclass, Class, Textclass , Navigate}) => {
    return (
        <Fragment>
            <div className={`box !bg-${color} ${Customclass}`}>
                <div className="box-body">
                    <div className="flex items-center w-full">
                        <div className="me-2">
                            <span className="avatar avatar-rounded">
                                <img src={Imgsrc} alt="img" className={Imgclass} />
                            </span>
                        </div>
                        <div className="">
                            <div className={`text-[.9375rem] font-semibold !text-${Textclass}`}>{Title}</div>
                            <p className={`mb-0 text-${Textclass} opacity-[0.7] text-[.75rem]`}>{Value}</p>
                        </div>
                        <div className="ms-auto">
                            <Link aria-label="anchor" to={Navigate} className={`text-${Class}`}><i className="bi bi-three-dots-vertical"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Spkbgcards