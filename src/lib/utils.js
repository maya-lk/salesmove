export function CountryOptionRenderer ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray, valueKey }) {
  
    return (
        <div
            key={key}
            onClick={() => selectValue(option)}
            onMouseEnter={() => focusOption(option)}
            style={{ padding : '0.5rem' , cursor : 'pointer' }}
        >   
            
            <label>
                {
                    (option.flagPath)?
                    (<img
                        className="countryIcon"
                        src={option.flagPath}
                        style={{ width : '30px' , marginRight : '10px' }}
                        alt={option.value}
                    />)
                    : ''
                } 
                {option.value}
            </label>
        </div>
    )
}