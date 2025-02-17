import React, { useState } from 'react';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import { Utils } from '../../../utils/Utils';
import SpkDropdown from '@/@spk/uielements/spk-dropdown';
import { Str } from '@/utils/Str';
import { lang } from '@/utils/lang';
import { Link } from 'react-router-dom';
import { OneDArray, TColumn } from 'gridjs/dist/src/types.js';
import { ComponentChild } from 'preact';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface MetaData {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    from: number;
    to: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    firstPageUrl: string | null;
    lastPageUrl: string | null;
    path: string;
    links: PaginationLink[];
}

export interface ApiResponseGridJs<T = any> {
    data: T[];
    meta: MetaData;
}

export interface Dataset {
    label: TColumn | string | ComponentChild;
    field: (row: any) => ComponentChild;
}

interface GridProps {
    url: string;
    dataset: Dataset[];
    limit?: number;
    isAuth?: boolean;
    filter?: string;
    TopHeader?: () => JSX.Element;
    keyInstance?: string | null;
}
const Text = () => {
    return {
        title: Str.cap(lang.company["."] ?? ''),
        addNewCompany: Str.cap(lang.company.add_new_company ?? ''),
        search: Str.cap(lang.search ?? ''),
        searchBtn: Str.cap(lang.search ?? ''),
    }
}
export const GridComponent = ({ url, dataset, limit = 10, isAuth = true, QuerySerach = null, keyInstance = null }: any) => <Grid
    key={keyInstance}
    resizable={true}
    fixedHeader={true}
    pagination={{
        limit: limit,
        server: {
            url: (prev: any, page: any, limit: any) => `${prev}?page=${page + 1}&limit=${limit}&search=${QuerySerach ?? ''}`,
        }
    }}
    columns={dataset.map((col: any) => col.label)}
    server={{
        url: `${url}`,
        headers: {
            'Content-Type': 'application/json',
            ...(isAuth ? Utils.AutorizationHeader() : {}),
        },
        then: (thendata: ApiResponseGridJs) => {
            return thendata.data.map((item: any) =>
                dataset.map((col: any) => col.field(item))
            );
        },
        total: (data: ApiResponseGridJs) => data.meta.totalItems,
    }}
/>

const GridJSMemo = React.memo(GridComponent);

export default function GridJSM2({ url, dataset, limit = 10, isAuth = true, TopHeader = () => <></>, keyInstance = null }: GridProps) {
    const [search, setSearch] = useState('');
    const [querySearch, setQuerySearch] = useState('');
    return (
        <div id='GridM2' className='w-full h-full'>
            <div id="grid-wide" className="table-responsive h-full">

                <GridJSMemo
                    key={keyInstance ?? dataset.map((col: any) => col.label).join('')}
                    url={url}
                    dataset={dataset}
                    limit={limit}
                    isAuth={isAuth}
                    QuerySerach={querySearch}
                />
            </div>
        </div>
    );
}


