import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type PageheaderProps = {
  currentpage?: string;
  activepage?: string;
  mainpage?: string;
  activepage_link?: string;
};

const Pageheader = (props: PageheaderProps) => {
  return (
    <Fragment>
      <div className='block justify-between page-header md:flex'>
        <div>
          <h3 className='!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white dark:hover:text-white text-[1.125rem] font-semibold'>
            {props.currentpage}
          </h3>
        </div>
        <ol className='flex items-center whitespace-nowrap min-w-0'>
          <li className='text-[0.813rem]'>
            <Link
              className='flex items-center text-primary hover:text-primary dark:text-primary truncate'
              to={props?.activepage_link ?? '#'}>
              {props.activepage}
              <i className='ti ti-chevrons-right flex-shrink-0 text-[#8c9097] dark:text-white/50 px-[0.5rem] overflow-visible rtl:rotate-180'></i>
            </Link>
          </li>
          <li
            className='text-[0.813rem] text-defaulttextcolor font-semibold hover:text-primary dark:text-[#8c9097] dark:text-white/50 '
            aria-current='page'>
            {props.mainpage}
          </li>
        </ol>
      </div>
    </Fragment>
  );
};

export default Pageheader;
