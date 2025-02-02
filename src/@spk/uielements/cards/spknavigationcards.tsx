import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Navigationcards {
    Navigationclass?: string
    Customheaderclass?: string
    Navigate: string | URL; // Ensure Navigate is always defined
    ActiveNavigate?: string | undefined; // Ensure Navigate is always defined
    LinkNavigate?: string | URL; // Ensure Navigate is always defined
}
const Spknavigationcards: React.FC<Navigationcards> = ({ Navigationclass, Customheaderclass , Navigate}) => {
    return (
        <Fragment>
             <div className="box text-center">
                <div className={`box-header ${Customheaderclass}`}>
                    <ul className={`nav nav-${Navigationclass} box-header-${Navigationclass} ms-1 flex   gap-2 items-center`}>
                        <li className="nav-item">
                            <Link className="nav-link active !py-2 !px-4" aria-current="true"
                                to={Navigate}>Active</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={Navigate}>Link</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={Navigate} className="nav-link disabled">Disabled</Link>
                        </li>
                    </ul>
                </div>
                <div className="box-body">
                    <h6 className="box-title font-semibold">Special title treatment</h6>
                    <p className="card-text mb-4">With supporting text below as a natural lead-in to
                        additional content.</p>
                    <Link to={Navigate} className="ti-btn ti-btn-primary-full">Go
                        somewhere</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Spknavigationcards