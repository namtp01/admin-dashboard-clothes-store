import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
const ColorPicker = ({ colors: initialColors, onChange }) =>
{
    const [colors, setColors] = useState(initialColors || ['']);

    const handleColorChange = (event, index) =>
    {
        const newColors = [...colors];
        newColors[index] = event.target.value;
        setColors(newColors);
        onChange(newColors);
    };

    const handleAddColor = () =>
    {
        setColors([...colors, '']);
    };

    const handleRemoveColor = (index) =>
    {
        const newColors = [...colors];
        newColors.splice(index, 1);
        setColors(newColors);
        onChange(newColors);
    };

    return (
        <div className='card-body'>
            <div className=''>
                {colors.map((color, index) => (
                    <div className='d-flex p-1 flex-row' key={index}>
                        <input
                            type="color"
                            value={color}
                            onChange={(event) => handleColorChange(event, index)}
                        />
                        {/* <button className="btn-primary btn" onClick={() => handleRemoveColor(index)}><FiDelete /></button> */}
                        <FiDelete className=' m-lg-1' onClick={() => handleRemoveColor(index)} />
                    </div>
                ))}
                <button className="btn btn-primary mt-2" onClick={handleAddColor}>Add color</button>
            </div>
        </div>
    );
};

export default ColorPicker;