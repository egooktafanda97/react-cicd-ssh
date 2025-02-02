import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Utilities {
    Customcardclass?: string
    Text?: string;
    Title?: string;
    Navigate: string | URL; // Ensure Navigate is always defined
}
const Spkutilitiescards: React.FC<Utilities> = ({ Customcardclass, Title, Text , Navigate}) => {
    return (
        <Fragment>
            <div className={`box ${Customcardclass}`}>
                <div className="box-header">
                    <div className="box-title">{Title}</div>
                </div>
                <div className="box-body">
                    <div className="card-text">
                         {Text}
                    </div>
                </div>
                <div className="box-footer">
                    <Link to={Navigate}
                        className="ti-btn ti-btn-primary-full !grid">Button</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Spkutilitiescards