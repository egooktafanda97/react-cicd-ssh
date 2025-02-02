import { Fragment } from 'react'
import SpkButton from './spk-button'
import { Link } from 'react-router-dom'
import SpkBadge from './spk-badge'

const SpkDropdown = ({ Customclass, Custommenuclass, Icon = false, Arrowicon = false, SvgClass, Svg, Svgaftertext, Badgetext, Badgeclass, Badgeid, Badgecolor, Notificationbadge, Svgicon, Badgetag = false, Image, Imagetag = false, Linktag = false, Menulabel, Imageclass, Imagename, Size, Linkclass, Svgheight, Svvgviewbox, Strokewidth, SvgStroke, Svgwidth, children, CustomToggleclass, Toggletext, iconPosition, buttonid, color, arialexpand, IconClass }: any) => {
  return (
    <Fragment>
      <div className={`hs-dropdown ti-dropdown  ${Customclass}`}>
        {Linktag ?
          <Link to="#" className={Linkclass} aria-expanded={arialexpand} aria-label="anchor" id={buttonid}>
            {iconPosition === 'before' ?
              (
                <>
                  {Imagetag ? (<img src={Image} alt={Imagename} className={Imageclass} />) : <>{Icon ? (<i className={IconClass}></i>) : ""}</>}
                  {Toggletext}
                </>
              )
              : (
                <>
                  {Toggletext}
                  {Imagetag ? (<img src={Image} alt={Imagename} className={Imageclass} />) : <>{Icon ? (<i className={IconClass}></i>) : ""}</>}

                </>
              )}

            {Arrowicon ? <i className="ri-arrow-down-s-line align-middle ms-1"></i> : ""}

            {Svg ?
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className={SvgClass} fill="none" width={Svgwidth} height={Svgheight} viewBox={Svvgviewbox} strokeWidth={Strokewidth} stroke={SvgStroke} strokeLinejoin="round">
                  <path strokeLinecap="round" d={Svgicon} strokeWidth={Strokewidth} />
                </svg>
                {Svgaftertext}
              </>
              : ""}
            {Badgetag ?
              <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                <SpkBadge variant={Badgecolor} customClass={Badgeclass} Id={Badgeid}>{Badgetext}</SpkBadge>
              </span>
              : ""}
          </Link>
          :
          <SpkButton size={Size} customClass={`ti-btn ${CustomToggleclass}`} variant={color} buttontype="button" Id={buttonid} Expand={arialexpand}>

            {iconPosition === 'before' ?
              (
                <>
                  {Imagetag ? (<img src={Image} alt={Imagename} className={Imageclass} />) : <>{Icon ? (<i className={IconClass}></i>) : ""}</>}
                  {Toggletext}
                </>
              )
              : (
                <>
                  {Toggletext}
                  {Imagetag ? (<img src={Image} alt={Imagename} className={Imageclass} />) : <>{Icon ? (<i className={IconClass}></i>) : ""}</>}

                </>
              )}

            {Arrowicon ? <i className="ri-arrow-down-s-line align-middle ms-1"></i> : ""}

            {Svg ?
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className={SvgClass} fill="none" width={Svgwidth} height={Svgheight} viewBox={Svvgviewbox} strokeWidth={Strokewidth} stroke={SvgStroke}>
                  <path strokeLinecap="round" d={Svgicon} strokeWidth={Strokewidth} />
                </svg>
                {Svgaftertext}
              </>
              : ""}
            {Badgetag ?
              <span className={`flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem] ${Notificationbadge ? "animate-slow-ping absolute inline-flex -top-[2px] -start-[2px] h-full w-full rounded-full bg-secondary/40 opacity-75" : ''}`}>
                <SpkBadge variant={Badgecolor} customClass={Badgeclass} Id={Badgeid}>{Badgetext}</SpkBadge>
              </span>
              : ""}
          </SpkButton>
        }
        <ul className={`hs-dropdown-menu ti-dropdown-menu hidden ${Custommenuclass}`} aria-labelledby={Menulabel} role="menu">
          {children}
        </ul>
      </div>
    </Fragment>
  )
}

export default SpkDropdown