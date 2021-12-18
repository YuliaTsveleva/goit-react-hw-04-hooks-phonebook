import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css';

const Section = ({ title, children }) => {
  return (
    <section className={s.Section}>
      {title && <h1 className={s.Title}>{title}</h1>}
      {children}
    </section>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
