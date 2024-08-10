export const CalendarEvent = ({ event }) => {
  const { title, user, notes, id } = event;

  return (
    <>
      <strong>{title}</strong>
      <span>- {notes}</span>
      <br />
      <span>{user.name}</span>
    </>
  );
};
