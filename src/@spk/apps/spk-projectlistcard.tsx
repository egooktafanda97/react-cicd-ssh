import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SpkDropdown from '../uielements/spk-dropdown';

interface SpkProjectListCardProps {
  imgSrc?: string;
  title?: string;
  count?: number | string;
  avatars?: JSX.Element[];
  badge?: string;
  color?: string;
  description?: string;
  progress?: any;
  percent?: number | string;
  assigndate?: string;
  duedate?: string;
  bgcolor?: string;
}
interface Cardprops {
card:SpkProjectListCardProps
}

const SpkProjectListCard: React.FC<Cardprops> = ({ card}) => {

  return (
    <Fragment>
      <div className="box custom-box">
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
            <span className="text-[#8c9097] dark:text-white/50 block text-[0.75rem]">
              Total <strong className="text-defaulttextcolor">{card.count}</strong> tasks completed
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
                <i className="ri-edit-line align-middle me-1 inline-flex"></i>Edit
              </Link>
            </li>
            <li>
              <Link className="ti-dropdown-item" to="#">
                <i className="ri-delete-bin-line me-1 align-middle inline-flex"></i>Delete
              </Link>
            </li>
          </SpkDropdown>
        </div>
        <div className="box-body">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold mb-1">Team :</div>
              <div className="avatar-list-stacked">{card.avatars}</div>
            </div>
            <div className="text-end">
              <div className="font-semibold mb-1">Priority :</div>
              <span className={`badge bg-${card.color}/10 text-${card.color}`}>{card.badge}</span>
            </div>
          </div>
          <div className="font-semibold mb-1">Description :</div>
          <p className="text-[#8c9097] dark:text-white/50 mb-3">{card.description}</p>
          <div className="font-semibold mb-1">Status :</div>
          <div>
            <div></div>
                <div className="progress progress-xs progress-animate" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}> 
                <div className={`progress-bar bg-primary ${card.progress}`}>
                    </div> 
                </div>
                
            <div className="mt-1">
              <span className="text-primary font-semibold">{card.percent}%</span> Completed
            </div>
          </div>
        </div>
        <div className="box-footer flex items-center justify-between">
          <div>
            <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] block">Assigned Date :</span>
            <span className="font-semibold block">{card.assigndate}</span>
          </div>
          <div className="text-end">
            <span className="text-[#8c9097] dark:text-white/50 text-[0.6875rem] block">Due Date :</span>
            <span className="font-semibold block">{card.duedate}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SpkProjectListCard;
