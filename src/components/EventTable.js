import React from 'react';

const EventTable = ({ events }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Event ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.description}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(event.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
