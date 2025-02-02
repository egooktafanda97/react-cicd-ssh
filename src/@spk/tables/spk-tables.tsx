
import React, { Fragment } from 'react';

interface HeaderItem {
    title: string | React.ReactNode;
    headerClassname?: string;
}

interface Spktables {
    children?: React.ReactNode;
    tableClass?: string;
    header?: HeaderItem[]; // Updated to accept array of objects
    showCheckbox?: boolean;
    onChange?: any;
    headerClass?: string;
    footchildren?: React.ReactNode;
    footerClass?: string;
    Customcheckclass?: string;
    tBodyClass?: string;
    headerContent?: any;
    checked?: any;
    tableRowclass?:string;
    checkboxclass?:string;
}

const Spktables: React.FC<Spktables> = ({ children, tableClass, headerClass, header,checkboxclass, footerClass, footchildren, headerContent, tBodyClass, checked, showCheckbox = false, Customcheckclass, onChange ,tableRowclass}) => {
    return (
        <Fragment>
            <table className={tableClass}>
                {headerContent}
                <thead className={headerClass}>
                    <tr className={tableRowclass}>
                        {showCheckbox && (
                            <th className={Customcheckclass}>
                                <input className={`form-check-input ${checkboxclass}`} type="checkbox" id="checkboxNoLabel02" defaultValue="" checked={checked} aria-label="..." onChange={onChange} />
                            </th>
                        )}
                        {header && header.map((headerItem, index) => (
                            <th key={index} className={headerItem.headerClassname}>
                                {headerItem.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={tBodyClass}>
                    {children}
                </tbody>
                <tfoot className={footerClass}>
                    {footchildren}
                </tfoot>
            </table>
        </Fragment>
    );
}

export default Spktables;
