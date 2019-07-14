import React,{Component,Fragment} from 'react'
import './index.less'
export default function (props) {
    return (
        <button {...props}>{props.children}</button>
    )
}
