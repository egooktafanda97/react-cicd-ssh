import React, { Fragment } from 'react'


interface Imgcap {
  Imgsrc?: string
  Footertext?: string;
  CustomTitleclass?: string;
  Customimgclass?: string;
  Custombodyclass?: string;
  Customfooterclass?: string;
  Text?: string;
  Title?: string;
  CustomClass?: string;
  children?: React.ReactNode;
  Cardheader?: boolean;
  CardFooter?: boolean;
  Imgposition?: string;
  Customclass?: string;
  Imgafterfooter?: boolean;
}

const Spkimagecapcards: React.FC<Imgcap> = ({ Cardheader = false, Customclass, Title, Imgafterfooter = false, Imgposition, children, CustomTitleclass, Customimgclass, Custombodyclass, Customfooterclass, Imgsrc, CardFooter = false, Footertext }) => {
  return (
    <Fragment>
      <div className={`box ${Customclass}`}>
            {Imgposition === "before" ?
                <>
                    <img src={Imgsrc} className={Customimgclass} alt="..." />
            </>
            : ""}
            {Cardheader ?
              <div className="box-header">
                    <div className={`box-title ${CustomTitleclass}`}>{Title}</div>
              </div>
              :''}
            <div className={`box-body ${Custombodyclass}`}>
                     {children}
            </div>
            {Imgposition === "after" ?
                <>
                    <img src={Imgsrc} className={Customimgclass} alt="..." />
                </>
            : ""}
            {CardFooter ?
            <div className={`box-footer ${Customfooterclass}`}>
                <p className="card-text mb-0"><small>{Footertext}</small></p>
            </div>
            :''}
             {Imgafterfooter ?
                <>
                    <img src={Imgsrc} className={Customimgclass} alt="..." />
            </>
            : ""}
        </div>
    </Fragment>
  )
}

export default Spkimagecapcards