import { Icon, IconProps } from "@chakra-ui/icons"

const GICIcon = (props: IconProps) => {
    return(
        <Icon 
            width="35" 
            height="35" 
            viewBox="0 0 35 35" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <rect width="35" height="35" fill="url(#pattern0)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_358_78" transform="scale(0.000925926)"/>
                </pattern>
                <image id="image0_358_78" width="1080" height="1080" xlinkHref="data:image/png;base64,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"/>
            </defs>
        </Icon>
    )
}

export default GICIcon