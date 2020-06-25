import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);
 


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        updateColors(colors.map(color => {
          return color.id === res.data.id ? res.data : color
        }));  //make sure this is correct state
     
      })
      .catch( err => console.log(err))
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        updateColors(colors.filter( color => {
          return color.id !== res.data
        }))
      })
      .catch(err => console.log(err.response.message))
  };

  //add color
  const addNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', addColor) // api url, adds new color on bottom
      .then(res => {
        console.log(res.data)
        updateColors([ //update color list
          ...colors, //pass in a copy of colors
          addColor //add the new color
        ])
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
   <form className='colors-wrap' onSubmit={addNewColor}>
   <legend>Add Color</legend>
          <label>
            color name:
            <input
            value={addColor.color}
            onChange={e =>
              setAddColor({ ...addColor, color: e.target.value })
            }
            />
          </label>
          <label>
            hex code:
            <input
            value={addColor.code.hex}
            onChange={e =>
              setAddColor({
                ...addColor,
                code: { hex: e.target.value }
              })
            }
            />
          </label>
          <div className="button-row">
          <button> Add a Color </button>
          </div>
   </form>
    </div>
   
  
      
  );
};

export default ColorList;
