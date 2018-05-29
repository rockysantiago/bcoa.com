import React from 'react'

export default (props) => {
  return (
    <div className="marginBottom-12">
      <label className="marginRight-4" htmlFor="all">
        <input name="filter" type="radio" id="all" defaultChecked="true" onChange={(el) => props.onChange(el.target.id)} />
        All
      </label>
      <label className="marginRight-4" htmlFor="residential">
        <input name="filter" type="radio" id="residential" onChange={(el) => props.onChange(el.target.id)} />
        Residential
      </label>
      <label className="marginRight-4" htmlFor="commercial">
        <input name="filter" type="radio" id="commercial" onChange={(el) => props.onChange(el.target.id)} />
        Commerical
      </label>
    </div>
  )
}
