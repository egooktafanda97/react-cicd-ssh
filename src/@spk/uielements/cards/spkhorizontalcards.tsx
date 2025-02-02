import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
interface Horizontal {
    Imagesrc?: string
    CardFooter?: boolean
    Footertext?: string
    Title?: string
    Linktag?: boolean;
    children?: React.ReactNode;
    CardHeader?: boolean;
    Imgposition?: string;
    Imgclass?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkhorizontalcards:React.FC<Horizontal> = ({Imagesrc,CardHeader,Imgclass, Navigate, Imgposition, children, CardFooter, Title,Linktag, Footertext}) => {
  return (
    <Fragment>
            <div className="box">
                   {Linktag ? <Link aria-label="anchor" to={Navigate} className="card-anchor"></Link> :""}
                <div className="grid grid-cols-12 gap-0">
                        {Imgposition === "before"? 
                                <div className="md:col-span-4 col-span-12">
                                    <img src={Imagesrc}
                                        className={Imgclass} alt="..." />
                                </div>
                            :''}
                        <div className="md:col-span-8 col-span-12">
                            {CardHeader?
                                <div className="box-header">
                                    <div className="box-title">{Title}</div>
                                </div>
                            :""}
                            <div className="box-body">
                                    {children}
                            </div>
                            {CardFooter? 
                                <div className="box-footer">
                                    <p className="card-text"><small className="text-[#8c9097] dark:text-white/50">{Footertext}</small></p>
                                </div>
                            : ''}
                        </div>
                    {Imgposition === "after"? 
                            <div className="md:col-span-4 col-span-12">
                                <img src={Imagesrc} className={Imgclass} alt="..." />
                            </div>
                        :''}
                </div>
            </div>
</Fragment>
  )
}

export default Spkhorizontalcards