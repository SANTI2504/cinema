package com.usa.cinema.Repository.CrudRepository;

import com.usa.cinema.Model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
}
