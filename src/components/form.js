import React, { PropTypes } from 'react';

const Form = ({
  onKeyPress,
  error
}) => (
  <article>
      <form action="" className="search__form" role="search" onKeyUp={onKeyPress}>
        <fieldset>
          <label for="search" className="search__form--hidden">Find your recipe</label>
          <input type="text" placeholder="Find your recipe" name="name" className="search__input"   />
        </fieldset>
      </form>
      {
        error.message ? (
          <p className="search__error-msg">{error.message }</p>
        ) : (
          <p></p>
        )
      }
  </article>
);

Form.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

export default Form;
