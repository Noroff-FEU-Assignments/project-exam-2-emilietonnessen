import React from "react"

export const Star = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
            </svg>
        </>
    )
}

export const StarEmpty = () => {
    return (
        <>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"/>
            </svg>
        </>
    )
}

interface LocationProps {
    color: string;
}

export const Location: React.FC<LocationProps> = ({color}) => (
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" className="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={color} d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
)


interface PhoneProps {
    color: string;
}

export const Phone: React.FC<PhoneProps> = ({color}) => (
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" className="svg-inline--fa fa-phone fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={color} d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>
)

interface EnvelopeProps {
    color: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({color}) => (
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={color} d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
)


interface LogoProps {
    color: string;
}

export const Logo: React.FC<LogoProps> = ({color}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600"><defs><style>.cls-1 </style></defs><g id="Layer_3" data-name="Layer 3"><g id="Icon"><polygon fill={color} className="cls-1" points="1457.35 1381.08 1424.47 1381.08 1424.47 732.3 932.1 239.93 439.72 732.3 439.72 1218.69 406.84 1218.69 406.84 718.68 932.1 193.42 1457.35 718.68 1457.35 1381.08"/><polygon fill={color} className="cls-1" points="1193.16 1406.58 1160.28 1406.58 1160.28 732.3 667.9 239.93 175.53 732.3 175.53 1360.78 945.01 1360.78 945.01 790.86 684.35 790.86 684.35 1218.69 651.46 1218.69 651.46 757.97 977.89 757.97 977.89 1393.67 142.65 1393.67 142.65 718.68 667.9 193.42 1193.16 718.68 1193.16 1406.58"/></g></g></svg>
)
