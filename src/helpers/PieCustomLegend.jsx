
export const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
            {payload.map((entry, index) => (
                <span
                    key={`item-${index}`}
                    style={{
                        display: 'inline-block',
                        marginRight: 16,
                        fontSize: 12,
                        color: '#333',
                    }}
                >
          <span
              style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  backgroundColor: entry.color,
                  marginRight: 6,
                  borderRadius: '50%',
              }}
          />
                    {entry.value}
        </span>
            ))}
        </div>
    );
};
