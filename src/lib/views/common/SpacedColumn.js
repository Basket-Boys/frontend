export default function SpacedColumn({ 
    children, 
    spacing,
    alignItems
}) {
    alignItems = alignItems || 'center';

    return <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: alignItems
        }}
    >
        {children && children.length > 1 
            ? children.map((child, i) => {
                return <div
                    key={i}
                    style={{
                        display: 'flex',
                        alignItems: alignItems,
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