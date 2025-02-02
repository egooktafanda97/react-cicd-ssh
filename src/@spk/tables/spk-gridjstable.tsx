import { Grid } from "gridjs-react";
import React, { Fragment } from 'react';

interface SpkGridjstablesProps {
    Data?: any;
    Columns: Array<any>;
    Search?: boolean;
    Pagination?: any;
    limit?: number;
    Sort?: boolean;
    reSizable?: boolean;
    Height?: string;
    width?: string;
    fixedHeader?: boolean;
    // loading?:boolean;
    // wide?:boolean
}

const SpkGridjstables: React.FC<SpkGridjstablesProps> = ({ Data, Columns, Search, Pagination, Sort, reSizable, Height, width, fixedHeader}) => {

    return (
        <Fragment>
            <Grid data={Data} columns={Columns} search={Search} pagination={Pagination} sort={Sort} resizable={reSizable} fixedHeader={fixedHeader} height={Height} width={width} />
        </Fragment>
    );
}

export default SpkGridjstables;
