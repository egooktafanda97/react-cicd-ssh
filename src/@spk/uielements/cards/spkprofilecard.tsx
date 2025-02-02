import React, { Fragment } from 'react'

interface profile {
    Personalinformation?: string;
    Imgsrc?: string;
    Name?: string;
    Role?: string;
    Posts?: string;
    Followers?: string;
    Following?: string;
}
const SpkProfilecard: React.FC<profile> = ({ Personalinformation, Imgsrc, Name, Role, Posts, Followers, Following }) => {
    return (
        <Fragment>
            <div className="box">
                    <div className="box-header">
                        <div className="flex w-full">
                            <div className="me-4">
                                <span className="avatar avatar-lg avatar-rounded">
                                    <img src={Imgsrc} alt="img" />
                                </span>
                            </div>
                            <div className="flex align-center justify-between w-full flex-wrap">
                                <div className="me-4">
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">Posts</p>
                                    <p className="font-semibold text-[1rem] mb-0">{Posts}</p>
                                </div>
                                <div className="me-4">
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">Followers</p>
                                    <p className="font-semibold text-[1rem] mb-0">{Followers}</p>
                                </div>
                                <div className="me-4">
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">Following</p>
                                    <p className="font-semibold text-[1rem] mb-0">{Following}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="font-semibold text-[1rem]">{Name}</div>
                        <div className="text-[#8c9097] dark:text-white/50 text-[.6875rem] mb-6">{Role}</div>
                        <p className="text-[.875rem] font-semibold mb-1">About:</p>
                        <p className="mb-0 card-text">{Personalinformation}</p>
                    </div>
                </div>
        </Fragment>
    )
}

export default SpkProfilecard