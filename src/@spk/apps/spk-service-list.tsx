import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SpkDropdown from '../uielements/spk-dropdown';

interface SpkServiceListCardProps {
  imgSrc?: string;
  title?: string;
  subtitle?: number | string;
  avatars?: any;
  description?: string;
  bgcolor?: string;
}
interface Cardprops {
  card: SpkServiceListCardProps
}

const SpkServiceListCard: React.FC<Cardprops> = ({ card }) => {

  return (
    <Fragment>
      {/* Background overlay, responsif dan mendukung dark mode */}
      <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-[#d3d5d6] bg-[radial-gradient(#ffffff33_1px,#f0f1f7_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(#ffffff44_1px,#00091d_1px)] dark:bg-[#1f1f1f]" />

      <div className="box custom-box relative z-10">
        <div className="box-header items-center !justify-start flex-wrap !flex">
          <div className="me-2">
            <span className={`avatar avatar-rounded p-1 bg-${card.bgcolor}/10 text-${card.bgcolor}`}>
              <img src={card.imgSrc} alt="" />
            </span>
          </div>
          <div className="flex-grow">
            <Link to="#" className="font-semibold text-[.875rem] block text-truncate project-list-title">
              {card.title}
            </Link>
            <span className="text-[#74787f] dark:text-white/50 block text-[0.6rem]">
              service <strong className="text-defaulttextcolor">create order</strong>
            </span>
          </div>
          <SpkDropdown
            Icon={true}
            Linktag={true}
            IconPosition="before"
            arialexpand={false}
            Linkclass="ti-btn ti-btn-sm ti-btn-light !mb-0"
            IconClass="fe fe-more-vertical"
          >
            <li>
              <Link className="ti-dropdown-item" to="#">
                <i className="ri-eye-line align-middle me-1 inline-flex"></i>View
              </Link>
            </li>
            <li>
              <Link className="ti-dropdown-item" to="#">
                <i className="ri-text-bin-line me-1 align-middle inline-flex"></i>
                Documentation
              </Link>
            </li>
          </SpkDropdown>
        </div>
        <div className="box-body">
          <div className="font-semibold mb-1">Description :</div>
          <p className="text-[#8c9097] dark:text-white/50 mb-3">{card.description}</p>
        </div>
        <div className="box-footer flex items-center justify-between">
          <div>
            {/* <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] block">Assigned Date :</span>
          <span className="font-semibold block">{card.assigndate}</span> */}
          </div>
          <div className="text-end">
            <div>
              <div className="avatar-list-stacked">{card.avatars}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default SpkServiceListCard;
