import React, { Fragment } from 'react'
import SpkBadge from '../spk-badge';
import { Link } from 'react-router-dom';

interface Badge {
  text: string; // The text for the badge
  className?: string; // Optional class for the badge
}

interface BorderCards {
  badges?: Badge[]; // Array of badge objects
  images?: string[]; // Array of image sources
  Title?: string;
  Class?: string;
  Customcardclas?: string;
  Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkborderedcards: React.FC<BorderCards> = ({ badges = [], images = [], Title,  Class, Navigate, Customcardclas }) => {
  return (
    <Fragment>
       <div className={`box border  ${Customcardclas}`}>
            <div className="box-body ">
                <p className="text-[.875rem] font-semibold mb-3 leading-none">{Title}
                    <Link aria-label="anchor" to={Navigate}><i
                        className={`bi bi-plus-square ltr:float-right rtl:float-left mt-2 text-${Class} text-[1.125rem]`}></i></Link>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                {badges.map((badge, index) => (
                    <SpkBadge key={index} customClass={badge.className}>{badge.text}</SpkBadge>
                ))}
                </div>
                <div className="avatar-list-stacked">
                    {images.map((src, index) => (
                        <span className="avatar avatar-sm avatar-rounded" key={index}>
                            <img src={src} alt={`img-${index}`} />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Spkborderedcards