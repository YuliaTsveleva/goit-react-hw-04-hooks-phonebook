import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './AddContactForm.module.css';
import CONFIG from '../../Data/inputConfig.json';
import { nanoid } from 'nanoid';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function AddContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number, email });
    resetState();
  };

  const resetState = () => {
    setName('');
    setNumber('');
    setEmail('');
  };

  const states = [name, number, email];
  // разобраться с value инпута

  return (
    <form className={s.Form} autoComplete="off" onSubmit={handleSubmit}>
      {CONFIG.map(field => (
        <div key={field.name}>
          <label className={s.Label}>
            {field.label}
            <input
              id={field.id}
              // value={[field.name].value}
              value={states[field.id - 1]}
              onChange={handleChange}
              className={s.Input}
              type={field.type}
              name={field.name}
              pattern={field.pattern}
              title={field.title}
              required={field.required}
            />
          </label>
        </div>
      ))}
      <p className={s.Reminder}>Fields marked with * are required</p>
      <button className={s.Button} type="submit">
        <AiOutlineUserAdd className={s.Icon} size={16} />
        Add contact
      </button>
    </form>
  );
}

AddContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
