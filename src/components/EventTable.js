import React from 'react';

const EventTable = ({ events }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.id}</td>
            <td>{event.type}</td>
            <td>{event.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
