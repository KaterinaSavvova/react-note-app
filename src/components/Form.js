import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {
  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      firebase.addNote(value.trim()).then(() => {
        alert.show('The note was created', 'success');
      }).catch(() => {
        alert.show('Something goes wrong', 'danger');
      })
      setValue('');
    } else {
      alert.show('Enter a title for the note')
    }

    alert.show(value, 'success')
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a title for the note"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
    </form>
  )
}