import React, { Component } from 'react';
import s from './AddContactForm.module.css';
import CONFIG from '../../Data/inputConfig.json';
import { nanoid } from 'nanoid';
import { AiOutlineUserAdd } from 'react-icons/ai';

class AddContactForm extends Component {
  state = {
    name: '',
    number: '',
    email: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
      email: '',
    });
  };

  render() {
    return (
      <form className={s.Form} autoComplete="off" onSubmit={this.handleSubmit}>
        {CONFIG.map(field => (
          <div key={field.name}>
            <label className={s.Label}>
              {field.label}
              <input
                id={nanoid()}
                value={this.state[field.name]}
                onChange={this.handleChange}
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
}

export default AddContactForm;
