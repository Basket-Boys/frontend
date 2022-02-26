export default function SpacedColumn({ 
    children, 
    spacing
}) {
    return <div
        style={{
            flexDirection: 'column'
        }}
    >
        {children && children.length > 1 
            ? children.map((child, i) => {
                return <div
                    key={i}
                    style={{
                        display: 'flex',
                        marginBottom: i === children.length - 1 ? 0 : spacing
                    }}
                >
                    {child}
                </div>;
            })
            : children
        }
    </div>
}