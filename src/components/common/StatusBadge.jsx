import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const s = status.toLowerCase();

  let colorClass = 'badge-blue';
  
  if (
    s.includes('no objection') ||
    s.includes('clear') ||
    s.includes('verified') ||
    s.includes('approved') ||
    s.includes('completed') ||
    s.includes('accepted') ||
    s.includes('resolved') ||
    s.includes('successful') ||
    s.includes('mutated')
  ) {
    colorClass = 'badge-green';
  } else if (
    s.includes('eligible')
  ) {
    colorClass = 'badge-blue';
  } else if (
    s.includes('pending') ||
    s.includes('under review') ||
    s.includes('awaiting') ||
    s.includes('under process')
  ) {
    colorClass = 'badge-orange';
  } else if (
    s.includes('dispute') ||
    s.includes('objection') ||
    s.includes('delayed') ||
    s.includes('protest') ||
    s.includes('rejected') ||
    s.includes('overdue')
  ) {
    colorClass = 'badge-red';
  } else if (
    s.includes('notice') ||
    s.includes('comp due') ||
    s.includes('due')
  ) {
    colorClass = 'badge-purple';
  }

  return (
    <span className={`badge ${colorClass}`}>
      <span className="badge-dot"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
