import Select, { Props as SelectProps } from 'react-select';

interface SelectComponentProps {
    option: SelectProps['options'];
    defaultvalue?: SelectProps['value'];
    mainClass?: string;
    onfunchange?: (value: any) => void;
    disabled?: boolean;
    getValue?: SelectProps['value'];
    clearable?: boolean;
    multi?: boolean;
    searchable?: boolean;
    placeholder?:string;
    autofocus?:boolean;
    noOptionsmessage?:any;
}

 const SelectComponent: React.FC<SelectComponentProps> = ({option, autofocus,noOptionsmessage, defaultvalue, mainClass, onfunchange,disabled,getValue,clearable,multi,searchable,placeholder,...rest}) => {

    return (
        <>
            <Select name="state" options={option} className={mainClass} onChange={onfunchange as SelectProps['onChange']} isDisabled={disabled} isMulti={multi}
            menuPlacement='auto' classNamePrefix="Select2" defaultValue={defaultvalue} value={getValue}  isClearable={clearable} isSearchable={searchable} placeholder={placeholder}
            autoFocus={autofocus} noOptionsMessage={noOptionsmessage} {...rest}
        />
        </>
    )
}
export default SelectComponent;