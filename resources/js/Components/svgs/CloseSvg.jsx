export default function CloseSvg({className, onClick}) {
    return (
        <svg
            width="16px"
            height="16px"
            viewBox="0 -0.5 8 8"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            onClick={onClick}
        >
            <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-385.000000, -206.000000)"
                    className="fill-slate-300"
                >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <polygon
                            id="close_mini-[#1522]"
                            points="334.6 49.5 337 51.6 335.4 53 333 50.9 330.6 53 329 51.6 331.4 49.5 329 47.4 330.6 46 333 48.1 335.4 46 337 47.4"
                        ></polygon>
                    </g>
                </g>
            </g>
        </svg>
    );
}
