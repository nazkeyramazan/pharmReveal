import React, {useRef, useState} from 'react';
import {VariableSizeList as List} from 'react-window';

const MultiSelectMinimal = ({
                                options,
                                selected = [],
                                onChange,
                                placeholder = "Select...",
                                label,
                                by = "name",           // поиск по этому полю
                                valueField = "name"      // selected[] содержит эти значения
                            }) => {
    const WIDTH = "100%";
    const wrapperRef = useRef();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const filtered = options.filter(opt =>
        opt?.[by]?.toLowerCase().includes(search.toLowerCase())
    );

    const isAllSelected = filtered.every(opt => selected.includes(opt[valueField]));
    const isSomeSelected = filtered.some(opt => selected.includes(opt[valueField]));

    const toggleSelect = (val) => {
        if (selected.includes(val)) {
            onChange(selected.filter(i => i !== val));
        } else {
            onChange([...selected, val]);
        }
    };

    const toggleSelectAll = () => {
        const filteredValues = filtered.map(f => f[valueField]);

        if (isAllSelected) {
            // Удаляем из выбранных только видимые (filtered)
            const newSelection = selected.filter(val => !filteredValues.includes(val));
            onChange(newSelection);
        } else {
            // Добавляем только те, которых ещё нет
            const newSelection = Array.from(new Set([
                ...selected,
                ...filteredValues.filter(val => !selected.includes(val))
            ]));
            onChange(newSelection);
        }
    };


    const handleBlur = (e) => {
        if (!wrapperRef.current.contains(e.relatedTarget)) {
            setOpen(false);
        }
    };
    const listRef = useRef();

    const getItemSize = (index) => {
        const text = filtered[index]?.[by] || '';
        const approxLineLength = 30; // сколько символов в строку
        const lines = Math.ceil(text.length / approxLineLength);
        return (lines>=2 ? 2 : 1) * 24 + 8; // высота строки * кол-во строк + отступы
    };

    const Row = ({index, style}) => {
        const opt = filtered[index];
        const labelText = opt[by];
        const val = opt[valueField];

        return (
            <div
                style={{
                    ...style,
                    fontSize: 14,
                    borderBottom: '1px solid #ddd',
                    paddingTop: 4,
                    paddingBottom: 4,
                    boxSizing: 'border-box'
                }}
            >
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        gap: 6,
                    }}
                >
                    <input
                        type="checkbox"
                        checked={selected.includes(val)}
                        onChange={() => toggleSelect(val)}
                    />
                    <span style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        fontSize: 14
                    }}>
                      {labelText}
                    </span>
            </label>
    </div>
    )
        ;
    };

    return (
        <div
            ref={wrapperRef}
            tabIndex={0}
            onBlur={handleBlur}
            style={{
                width: WIDTH,
                position: 'relative',
                fontFamily: 'sans-serif',
                fontSize: 14,
                color: '#111',
                marginBottom: '15px'
            }}
        >
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: 4,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#111'
                }}>
                    {label}
                </label>
            )}

            <div
                onClick={() => setOpen(prev => !prev)}
                style={{
                    width: '100%',
                    border: '1px solid #aaa',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    background: '#fff',
                    boxSizing: 'border-box'
                }}
            >
                {selected.length === options.length
                    ? 'All selected'
                    : selected.length > 0
                        ? `${selected.length} selected`
                        : placeholder}
            </div>

            {open && (
                <div style={{
                    width: '100%',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    border: '1px solid #aaa',
                    background: '#fff',
                    zIndex: 10,
                    marginTop: 2,
                    boxSizing: 'border-box'
                }}>
                    {options.length > 10 && (
                        <input
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                            }}
                            placeholder="Search..."
                            style={{
                                width: '100%',
                                padding: '4px 8px',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                fontSize: 14,
                                boxSizing: 'border-box'
                            }}
                            autoFocus
                        />
                    )}

                    <div style={{
                        borderBottom: '1px solid #ddd',
                        padding: '4px 8px',
                        fontWeight: 'normal'
                    }}>
                        <label style={{display: 'flex', alignItems: 'center'}}>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                ref={el => {
                                    if (el) el.indeterminate = isSomeSelected && !isAllSelected;
                                }}
                                onChange={toggleSelectAll}
                                style={{marginRight: 6}}
                            />
                            Select All
                        </label>
                    </div>

                    {/*<List*/}
                    {/*    height={Math.min(filtered.length, 10) * 48}*/}
                    {/*    itemCount={filtered.length}*/}
                    {/*    itemSize={48}*/}
                    {/*    width="100%"*/}
                    {/*>*/}
                    <List
                        ref={listRef}
                        height={Math.min(filtered.length, 10) * 48}
                        itemCount={filtered.length}
                        itemSize={getItemSize}
                        width="100%"
                    >
                        {Row}
                    </List>
                </div>
            )}
        </div>
    );
};

export default MultiSelectMinimal;
