import * as icons from "@ant-design/icons"
import _ from "lodash"

function getAllIcons(){
    const newIcons = _.map(icons, (value, key) => {
        if (typeof value === "object"&&key!=="default") {
            return {key,value}
        }

    })
    const finalIcons= newIcons.filter((icon)=> typeof icon!=="undefined")
    return finalIcons
}

export default getAllIcons()