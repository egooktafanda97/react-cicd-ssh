import React, { Fragment } from 'react'

interface ratingcard {
    Timevalue?: string
    Text?: string;
    Title?: string;
    Imgsrc?: string;
    Name?: string;
}
const Spkratingcard: React.FC<ratingcard> = ({ Timevalue, Title, Text, Imgsrc, Name }) => {
    return (
        <Fragment>
              <div className="box">
                    <div className="box-header !border-b-0 !pb-0 !justify-start">
                        <div>
                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                            <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                            <span className="text-black/10"><i className="bi bi-star-fill"></i></span>
                            <p className="block text-[#8c9097] dark:text-white/50 mb-0 text-[.75rem] font-semibold">{Timevalue}</p>
                        </div>
                    </div>
                    <div className="box-body pt-4">
                        <div className="font-semibold text-[.9375rem] mb-2">{Title}</div>
                            {Text}
                    </div>
                    <div className="box-footer">
                        <div className="flex align-center">
                            <span className="avatar avatar-sm avatar-rounded me-2">
                                <img src={Imgsrc} alt="img" />
                            </span>
                            <div className="font-semibold text-[.875rem]">{Name}</div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Spkratingcard