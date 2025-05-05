import React from 'react';
import { AutoComplete, Spin, Tag } from 'antd';
import * as style from './AutocompleteField.module.css';

const AutocompleteField = ({
    placeholder = 'Оберіть опцію',
    options = [],
    onSelect,
    loading = false,
    style: customStyle = {},
    value,
    ...props
}) => {
    const renderOption = (item) => ({
        label: (
            <div className={style.optionItem}>
                {item.icon && <img src={item.icon} alt="" className={style.optionIcon} width={20} height={20} />}
                <span>{item.label}</span>
                {item.category && (
                    <Tag color="blue" className={style.categoryTag}>
                        {item.category}
                    </Tag>
                )}
            </div>
        ),
        value: item.value,
    });

    return (
        <AutoComplete
            placeholder={placeholder}
            className={`inputContainer ${customStyle}`}
            options={options.map(renderOption)}
            onSelect={onSelect}
            value={value}
            filterOption={(inputValue, option) =>
                option.label.props.children[1].props.children.toLowerCase().includes(inputValue.toLowerCase())
            }
            notFoundContent={
                loading ? <Spin size="small" /> : <span className={style.noResults}>Нічого не знайдено</span>
            }
            allowClear
            showSearch
            {...props}
        />
    );
};

export default AutocompleteField;
