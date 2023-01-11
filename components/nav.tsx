import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

//import {ActiveLink} from './ActiveLink'
const navigationPayroll = [
  {
    'name': "Map",
    'url': "/"
  },
  {
    'name': "List",
    'url': "https://docs.google.com/spreadsheets/d/1rnSj8l2cbYYL--VUgSjZRUhXWPwqkm88JZUkip8oro4/edit#gid=1756876634",
    'newtab': true
  },
  {
    'name': "Los Angeles Controller",
    'url': "https://controller.lacity.gov",
    'newtab': true
  }
]


const ActiveLink = (propsparam:any) => {
  const { children, activeClassName, ...props } = propsparam;
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  var propMatch =
    props.validRegexString
      ? props.validRegexString
      : "a^"

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  var regex = new RegExp(propMatch, 'i');
  
  const className =
    asPath === props.href || asPath === props.as || regex.test(asPath)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    // @ts-ignore: Unreachable code error
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

function Nav() {
  return <div className="z-50 bg-[#1a1a1a] flex flex-col">
    <nav className="z-50 flex flex-row  h-content">
      {navigationPayroll.map((item:any, itemIdx:any) =>
                     
              
                     <ActiveLink activeClassName="text-white py-3 px-6 block hover:text-green-300 focus:outline-none text-green-300 border-b-2 font-medium border-green-300" href={item.url}
                     key={itemIdx}
                     >
                     <a className="text-white py-3 px-6 block hover:text-green-300 focus:outline-none underline"
                          target={`${item.newtab === true ? "_blank" : ""}`}
                     >
                                                 {item.name}
                     </a>
                     </ActiveLink>
                     
                   )}
  </nav></div>
}

export default Nav