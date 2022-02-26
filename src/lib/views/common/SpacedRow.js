export default function SpacedRow({ 
    children, 
    spacing
}) {
    return <div
        style={{
            display: 'flex',
            flexDirection: 'row'
        }}
    >
        {children && children.length > 1 
            ? children.map((child, i) => {
                return <div
                    key={i}
                    style={{
                        display: 'flex',
                        marginRight: i === children.length - 1 ? 0 : spacing
                    }}
                >
                    {child}
                </div>;
            })
            : children
        }
    </div>
}