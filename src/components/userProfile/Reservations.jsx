import React, { useEffect, useState } from 'react';

const Reservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
console.log(reservations)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3666/user/${userId}/reservation`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al obtener reservas: ${response.statusText}`);
        }

        const data = await response.json();
        setReservations(data.reservation);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleCancelReservation = async (reservationId) => {
    const confirmation = window.confirm('¿Estás seguro de que quieres cancelar esta reserva?');

    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3666/reservations/${reservationId}`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al cancelar la reserva: ${response.statusText}`);
        }

        // Actualizar la lista de reservas después de la cancelación
        const updatedReservations = reservations.filter((reservation) => reservation.id !== reservationId);
        setReservations(updatedReservations);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <h3>Reservations</h3>
      {reservations.length === 0 ? (
        <p>No hay reservas pendientes.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <strong>Details:</strong> {reservation.details} <br />
              <strong>Start Date:</strong> {new Date(reservation.startDate).toLocaleDateString()} <br />
              <strong>End Date:</strong> {new Date(reservation.endDate).toLocaleDateString()} <br />
              <strong>Price:</strong> ${reservation.price} <br />
              <strong>Días hasta la reserva:</strong> {calculateDaysUntilReservation(reservation.startDate)} <br />
              <button onClick={() => handleCancelReservation(reservation.id)}>Cancelar Reserva</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const calculateDaysUntilReservation = (startDate) => {
  const today = new Date();
  const reservationDate = new Date(startDate);
  const timeDifference = reservationDate.getTime() - today.getTime();
  const daysUntilReservation = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysUntilReservation;
};

export default Reservations;
