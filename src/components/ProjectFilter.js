import React from 'react';

export default (props) => {
  return (
    <div className="f-subhead c-gray">
      <div className="radio">
        <input name="filter" type="radio" id="all" defaultChecked="true" onChange={(el) => props.onChange(el.target.id)} />
        <label className="marginRight-4" htmlFor="all">
          All Projects
        </label>
      </div>
      <div className="radio">
        <input name="filter" type="radio" id="residential" onChange={(el) => props.onChange(el.target.id)} />
        <label className="marginRight-4" htmlFor="residential">
          Residential
        </label>
      </div>
      <div className="radio">
        <input name="filter" type="radio" id="commercial" onChange={(el) => props.onChange(el.target.id)} />
        <label className="" htmlFor="commercial">
          Commercial
        </label>
      </div>
    </div>
  )
}
